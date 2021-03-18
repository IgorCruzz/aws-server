import errorSchema from './schemas/error/Error-schema';

import startServerParamSchema from './schemas/params/Aws/startServerParam.schema';
import startServerResultSchema from './schemas/results/startServerResult.schema';

import checkPortResultSchema from './schemas/results/checkPortResult.schema';

import findIPResultSchema from './schemas/results/findIPServerResult.schema';

export default {
    error: errorSchema,

    startServerParams: startServerParamSchema,
    startServerResult: startServerResultSchema,

    checkPortResult: checkPortResultSchema,

    findIPServerResult: findIPResultSchema,
};
