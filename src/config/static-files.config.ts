import { InitConfig } from "./init.config";
import * as path from 'path';
import * as fs from 'fs';
import { readSync, ReadDirOptions } from 'readdir';

export class StaticFilesConfig {
  paths: string[] = [];
  files: { name: string, path: string, contents: string }[];
  constructor(initConfig: InitConfig) {
    this.initialize(initConfig);
  }

  private initialize(initConfig: InitConfig) {
    if (process.env.STATIC_FILES_PATH && !initConfig._.initialized) {
      try {
        const dirpath = path.resolve(`${process.cwd()}/src`, process.env.STATIC_FILES_PATH);
        const options = [ReadDirOptions.ABSOLUTE_PATHS, ReadDirOptions.CASELESS_SORT];
        initConfig._.dirpath = dirpath;
        if (fs.existsSync(dirpath)) {
          this.paths = readSync(dirpath, [ '*', '**/*' ], options);
          this.eagerLoadStaticFiles();
        } else {
          initConfig._.errors.push(new Error(`Directory ${dirpath} does not exist.`).stack);
        }
      } catch (ex) {
        initConfig._.errors.push(ex.stack);
      }
    }
  }

  private eagerLoadStaticFiles() { 
    if (process.env.STATIC_FILES_EAGER_LOAD && !this.files) {
      this.files = this.paths.map((filepath) => {
        return {
          name: path.basename(filepath),
          path: filepath,
          contents: fs.readFileSync(filepath).toString()
        }
      })
    }
  }
}