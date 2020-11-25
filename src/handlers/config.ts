import { get as _get } from 'lodash';

import { authorize } from '../decorators';
import { config } from '../config';

class ConfigHandler {
  @authorize(event => _get(event, 'pathParameters'))
  async get(_event, _context, callback) {
    const response = {
      statusCode: 200,
      body: JSON.stringify({ ...config }, null, 2),
    };

    // return response;
    return callback(null, response);
  }
}

export const { get } = new ConfigHandler();
