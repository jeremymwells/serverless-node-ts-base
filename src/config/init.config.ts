import { StaticFilesConfig } from './static-files.config';

export class InitConfig {
  _: { errors: any[], initialized: boolean, dirpath: string };

  staticFiles: StaticFilesConfig;

  constructor() {
    this.initialize();
  }

  private initialize() {
    this._ = {
      errors: [],
      initialized: false,
      dirpath: '',
    };

    // call any config initialization here
    this.staticFiles = new StaticFilesConfig(this);

    this._.initialized = true;
  }

  
}
