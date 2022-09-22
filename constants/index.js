'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread2'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

var _HOC_MAIN_CLIENT_SIDE, _HOC_MAIN_SERVER_SIDE;

/* eslint-disable no-underscore-dangle */
var _FOR_INTERNAL_USE_ONLY_ = "@@@__#_FOR_INTERNAL_PURPOSE_ONLY_#__@@@";
var _USE_TYPE_ = "@@@__#_USE_TYPE___@#@__#_USE_TYPE___@@@";
var GET_INITIAL_PROPS_DEFAULT = 'getInitialProps';
var IS_DEBOUNCE_API_CALL = 'is_debounce_api_call';
var DEBOUNCE_API_CALL_DELAY_IN_MS = 'debounce_api_call_delay';
var ON_CANCEL_ERROR = 'API_CANCEL_ERROR';
var ON_ERROR = 'ERROR';
var ON_SUCCESS = 'SUCCESS';
var ON_FINALLY = 'FINALLY';
var ON_CANCEL = 'CANCEL';
var ON_REQUEST = 'REQUEST';
var ON_LOADING = 'LOADING';
var ON_UNMOUNT = 'UNMOUNT';
var ON_TOAST = 'TOAST';
var ERROR = 'ERROR';
var SUCCESS = 'SUCCESS';
var CALL = 'CALL';
var CANCEL = 'CANCEL';
var CUSTOM = 'CUSTOM_TASK';
var INFINITE_DATA_HANDLER = 'Infinite-Handler';
var DATA_HANDLER = 'Data-Handler';
var DELETE_DATA_HANDLER = 'Delete-Handler';
var UPDATE_DATA_HANDLER = 'Update-Handler';
var UPDATE_DATA_KEY_HANDLER = 'Update-Key-Handler';
var DELETE_DATA_KEY_HANDLER = 'Delete-Key-Handler';
var TOGGLE_DATA_KEY_HANDLER = 'Toggle-Key-Handler';
var SPLICE_DATA_HANDLER = 'Splice-Data-Handler';
var CALLBACK_HANDLER = 'Callback-Handler';
var RESET_HANDLER = 'Reset-Handler';
var TOAST_HANDLER = 'Toast-Handler';
var ERROR_HANDLER = 'Error-Handler';
var LOADER_HANDLER = 'Loading-Handler';
var DONT_UPDATE_DATA_HANDLER = "Don't-Update-Data-Handler";
var TYPE_NULL = 'null';
var TYPE_UNDEFINED = 'undefined';
var TYPE_STRING = 'string';
var TYPE_ARRAY = 'array';
var TYPE_BOOLEAN = 'boolean';
var TYPE_OBJECT = 'object';
var TYPE_FUNCTION = 'function';
var TYPE_ERROR = 'error';
var TYPE_SYMBOL = 'symbol';
var TYPE_GENERATOR_FUNCTION = 'generatorFunction';
var FOR_INTERNAL_USE_ONLY = _FOR_INTERNAL_USE_ONLY_;
var USE_TYPE = _USE_TYPE_;
var HANDLERS = 'handlers';
var NEXT_JS = 'nextJS';
var CREATE_REDUCER = 'createReducer';
var USE_HOOK = 'useHook';
var USE_HOC_HOOK = 'useHocHook';
var HOOK_WITH_HOC = 'hookWithHoc';
var ALLOW_MAP_STATE_TO_PROPS = 'mapStateToProps';
var GET_INITIAL_PROPS_KEY = 'getInitialPropsKey';
var IS_DEVELOPMENT = 'isDevelopment';
var HOC_MAIN_CONFIG_KEY = {
  HANDLERS: HANDLERS,
  NEXT_JS: NEXT_JS,
  CREATE_REDUCER: CREATE_REDUCER,
  USE_HOOK: USE_HOOK,
  USE_HOC_HOOK: USE_HOC_HOOK,
  HOOK_WITH_HOC: HOOK_WITH_HOC,
  ALLOW_MAP_STATE_TO_PROPS: ALLOW_MAP_STATE_TO_PROPS,
  GET_INITIAL_PROPS_KEY: GET_INITIAL_PROPS_KEY,
  IS_DEVELOPMENT: IS_DEVELOPMENT,
  USE_TYPE: USE_TYPE
};
var HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT = (_HOC_MAIN_CLIENT_SIDE = {}, _defineProperty(_HOC_MAIN_CLIENT_SIDE, HANDLERS, []), _defineProperty(_HOC_MAIN_CLIENT_SIDE, NEXT_JS, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_HOOK, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_HOC_HOOK, true), _defineProperty(_HOC_MAIN_CLIENT_SIDE, HOOK_WITH_HOC, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, ALLOW_MAP_STATE_TO_PROPS, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, GET_INITIAL_PROPS_KEY, null), _defineProperty(_HOC_MAIN_CLIENT_SIDE, IS_DEVELOPMENT, false), _defineProperty(_HOC_MAIN_CLIENT_SIDE, USE_TYPE, FOR_INTERNAL_USE_ONLY), _HOC_MAIN_CLIENT_SIDE);
var HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT = (_HOC_MAIN_SERVER_SIDE = {}, _defineProperty(_HOC_MAIN_SERVER_SIDE, HANDLERS, []), _defineProperty(_HOC_MAIN_SERVER_SIDE, NEXT_JS, true), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_HOOK, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_HOC_HOOK, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, HOOK_WITH_HOC, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, ALLOW_MAP_STATE_TO_PROPS, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, GET_INITIAL_PROPS_KEY, GET_INITIAL_PROPS_DEFAULT), _defineProperty(_HOC_MAIN_SERVER_SIDE, IS_DEVELOPMENT, false), _defineProperty(_HOC_MAIN_SERVER_SIDE, USE_TYPE, FOR_INTERNAL_USE_ONLY), _HOC_MAIN_SERVER_SIDE);
var API_END_POINTS = 'apiEndPoints';
var INITIAL_STATE = 'initialState';
var GET_DEFAULT_CONFIG = 'getDefaultConfig';
var DONT_RESET_REDUCER_KEYS = 'dontReset';
var IS_MOBILE = 'isMobile';
var SAGA = 'saga';
var SAGA_CONSTANT = 'constantSaga';
var REDUCER_CONSTANT = 'constantReducer';
var REDUCER = 'reducer';
var AXIOS_INTERCEPTORS = 'axiosInterceptors';
var REDUCER_NAME = 'name';
var HOC_INITIAL_CONFIG_KEY = {
  API_END_POINTS: API_END_POINTS,
  INITIAL_STATE: INITIAL_STATE,
  GET_DEFAULT_CONFIG: GET_DEFAULT_CONFIG,
  DONT_RESET_REDUCER_KEYS: DONT_RESET_REDUCER_KEYS,
  IS_MOBILE: IS_MOBILE,
  SAGA: SAGA,
  SAGA_CONSTANT: SAGA_CONSTANT,
  REDUCER_CONSTANT: REDUCER_CONSTANT,
  REDUCER: REDUCER,
  AXIOS_INTERCEPTORS: AXIOS_INTERCEPTORS,
  USE_HOOK: USE_HOOK,
  REDUCER_NAME: REDUCER_NAME
};
var COMMON_TASKS = {
  TASK_NAME: 'name',
  SUB_KEYS_ARRAY: 'subKey',
  IS_CLEAR_PREVIOUS_DATA_ON_SUCCESS: 'clearData',
  IS_CLEAR_PREVIOUS_DATA_ON_API_START: 'clearDataOnStart'
};
var DONT_UPDATE_RESPONSE_DATA = 'dontUpdateResponseData';
var UPDATE_CALLBACK = 'updateCallback';
var ID_REFERENCE_KEY = 'key';
var IDS = 'id';
var API_TASK_CONFIG_KEYS = {
  TASK: {
    KEY: 'task',
    INFINITE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      LIMIT: 'limit',
      IS_APPEND_DATA_ON_TOP: 'isAppendTop',
      SET_INFINITE_END_KEY_TRUE_OR_FALSE: 'setInfiniteEnd',
      UPDATE_CALLBACK: UPDATE_CALLBACK
    }),
    DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      UPDATE_CALLBACK: UPDATE_CALLBACK
    }),
    DELETE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS
    }),
    UPDATE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA: DONT_UPDATE_RESPONSE_DATA
    }),
    UPDATE_DATA_KEY_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      DONT_UPDATE_RESPONSE_DATA: DONT_UPDATE_RESPONSE_DATA
    }),
    DELETE_DATA_KEY_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      DELETE_KEYS_ARRAY: 'deleteKey'
    }),
    TOGGLE_DATA_KEY_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      ID_REFERENCE_KEY: ID_REFERENCE_KEY,
      IDS: IDS,
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      TOGGLE_KEYS_ARRAY: 'toggleKey'
    }),
    SPLICE_DATA_HANDLER: _objectSpread(_objectSpread({}, COMMON_TASKS), {}, {
      UPDATE_CALLBACK: UPDATE_CALLBACK,
      SPLICE_VALUE_ARRAY: 'spliceKey'
    }),
    RESET_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME
    },
    CALLBACK_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      CALLBACK_FUNCTION: 'callback'
    },
    TOAST_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      TOAST_OBJECT: 'toast'
    },
    ERROR_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      ERROR_OBJECT: 'error',
      IS_ERROR: 'isError'
    },
    LOADER_HANDLER: {
      TASK_NAME: COMMON_TASKS.TASK_NAME,
      IS_LOADING: 'loader'
    },
    DONT_UPDATE_DATA_HANDLER: _objectSpread({}, COMMON_TASKS)
  },
  TASKS: 'tasks',
  FILTER_ARRAY: 'filter',
  DONT_UPDATE_REUCER: 'dontUpdateReducer',
  EXECUTE_UPDATE_STATE_CALLBACK_ON_ERROR: 'excuteUpdateStateCallbackOnError',
  UPDATE_STATE_DATA_REDUCER_KEYS: 'updateDataReducerKey',
  SET_PROXY_FOR: 'proxyFor',
  REQUEST: {
    KEY: 'request',
    ASYNC_FUNCTION: 'asyncFunction',
    ASYNC_FUNCTION_PARAMS_ARRAY: 'asyncFunctionParams',
    PAYLOAD: 'payload',
    PARAMS: 'params',
    QUERY: 'query',
    DELAY_FUNCTION: 'delayFunction',
    DONT_UPDATE_REDUCER_ON_SUCCESS: 'dontUpdateReducerOnSucess',
    DONT_UPDATE_REDUCER_ON_ERROR: 'dontUpdateReducerOnError',
    AXIOS_INTERCEPTOR: 'axios',
    PARAM_SERIALIZER: 'paramsSerializer',
    API_CANCEL_KEY: 'cancelKey',
    AXIOS_CONFIG: 'axiosConfig',
    USE_CACHE: 'useCache',
    IS_ERROR_DATA_HANDLING: 'errorDataHandling',
    IS_CLEAR_DATA_ON_ERROR: 'clearDataOnError',
    IS_POLLING: 'polling',
    IS_ERROR_PARSER: 'errorParser',
    DEFAULT_ERROR_PARSER_FUNCTION: 'defaultErrorParser',
    POLLING_DELAY_COUNT_IN_MILLISECONDS: 'delay',
    MAX_RETRY_COUNT: 'retry',
    POLLING_MAX_COUNT: 'pollingCount',
    START_POLLING_AFTER_DELAY: 'callAfterDelay'
  },
  CALLBACK: {
    KEY: 'callback',
    UPDATE_STATE_CALLBACK: 'updateStateCallback',
    SUCCESS_CALLBACK: 'successCallback',
    ERROR_CALLBACK: 'errorCallback',
    CALLBACK_AFTER_500_MILLISECONDS: 'logoutCallback',
    FINAL_CALLBACK: 'finalCallback',
    POLLING_CALLBACK: 'pollingCallback',
    CANCEL_CALLBACK: 'cancelCallback',
    UPDATE_CALLBACK: UPDATE_CALLBACK
  }
};
var USE_QUERY_REDUCER_CONFIG_KEYS = {
  PARENT_KEY: 'key',
  REDUCER_KEY: 'key',
  REQUIRED_DATA_KEY: 'requiredKey',
  FILTER_ARRAY: 'filter',
  QUERY_DATA_STRING_OR_ARRAY: 'initialLoaderqueryState',
  INITIAL_LOADER_STATE: 'initialLoaderState',
  GET_DEFAULT_DATA_FORMAT: 'defaultDataFormat',
  DEFAULT_DATA_OR_FORMAT: 'default'
};
var USE_QUERY_CONFIG_KEYS = {
  REDUCER_NAME: 'reducerName',
  REDUCER_KEYS_ARRAY_OR_OBJECT_OR_STRING: USE_QUERY_REDUCER_CONFIG_KEYS,
  REDUCER_KEYS_CONFIG: 'config',
  CALLBACK_FUNCTION_RETURN_DATA: 'callback',
  TRIGGER_AFTER_CALLBACK_NO_DATA_RETURN: 'callbackSuccess',
  REFRESH_KEY: 'refreshKey'
};
var API_END_POINTS_CONFIG_KEYS = {
  API_URL: 'url',
  AXIOS_INTERCEPTORS: 'axios',
  API_METHOD: 'method',
  API_RESPONSE_SUCCESS_STATUS_CODE_KEY: 'responseStatusCodeKey',
  API_RESPONSE_SUCCESS_STATUS_CODES: 'responseStatusCode',
  API_RESPONSE_SUCCESS_MESSAGE_KEY: 'responseMessageKey',
  API_RESPONSE_SUCCESS_DATA_KEY: 'responseDataKey',
  API_RESPONSE_ERROR_DATA_KEY: 'errorDataKey',
  API_RESPONSE_ERROR_STATUS_CODE_KEY: 'errorStatusKey',
  API_RESPONSE_ERROR_MESSAGE_KEY: 'errorMessageKey',
  API_ERROR_HANDLER_STATUS_CODES: 'errorHandlerStatusCode',
  DEBOUNCE_API_CALL_DELAY_IN_MS: DEBOUNCE_API_CALL_DELAY_IN_MS,
  IS_DEBOUNCE_API_CALL: IS_DEBOUNCE_API_CALL,
  SAGA_EFFECT: 'effect'
};
var API_END_POINTS_CONFIG_DEFAULT_VALUE = {
  API_URL: undefined,
  AXIOS_INTERCEPTORS: undefined,
  API_METHOD: 'GET',
  API_RESPONSE_SUCCESS_STATUS_CODE_KEY: '',
  API_RESPONSE_SUCCESS_STATUS_CODES: [],
  API_RESPONSE_SUCCESS_MESSAGE_KEY: '',
  API_RESPONSE_SUCCESS_DATA_KEY: '',
  API_RESPONSE_ERROR_DATA_KEY: 'error',
  API_RESPONSE_ERROR_STATUS_CODE_KEY: '',
  API_RESPONSE_ERROR_MESSAGE_KEY: '',
  API_ERROR_HANDLER_STATUS_CODES: [],
  SAGA_EFFECT: 'latest'
};
var API_METHODS = {
  GET: 'get',
  REQUEST: 'request',
  DELETE: 'delete',
  HEAD: 'head',
  OPTIONS: 'options',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch'
};
var commonConstants = {
  API_END_POINTS_CONFIG_DEFAULT_VALUE: API_END_POINTS_CONFIG_DEFAULT_VALUE,
  API_END_POINTS_CONFIG_KEYS: API_END_POINTS_CONFIG_KEYS,
  USE_QUERY_CONFIG_KEYS: USE_QUERY_CONFIG_KEYS,
  API_TASK_CONFIG_KEYS: API_TASK_CONFIG_KEYS,

  /* Don't Change any key */
  INFINITE_DATA_HANDLER: INFINITE_DATA_HANDLER,
  DATA_HANDLER: DATA_HANDLER,
  DELETE_DATA_HANDLER: DELETE_DATA_HANDLER,
  UPDATE_DATA_HANDLER: UPDATE_DATA_HANDLER,
  UPDATE_DATA_KEY_HANDLER: UPDATE_DATA_KEY_HANDLER,
  DELETE_DATA_KEY_HANDLER: DELETE_DATA_KEY_HANDLER,
  TOGGLE_DATA_KEY_HANDLER: TOGGLE_DATA_KEY_HANDLER,
  SPLICE_DATA_HANDLER: SPLICE_DATA_HANDLER,
  RESET_HANDLER: RESET_HANDLER,
  CALLBACK_HANDLER: CALLBACK_HANDLER,
  TOAST_HANDLER: TOAST_HANDLER,
  ERROR_HANDLER: ERROR_HANDLER,
  LOADER_HANDLER: LOADER_HANDLER,
  DONT_UPDATE_DATA_HANDLER: DONT_UPDATE_DATA_HANDLER,

  /* Don't Change any key */
  ON_CANCEL_ERROR: ON_CANCEL_ERROR,
  ON_ERROR: ON_ERROR,
  ON_SUCCESS: ON_SUCCESS,
  ON_FINALLY: ON_FINALLY,
  ON_CANCEL: ON_CANCEL,
  ON_REQUEST: ON_REQUEST,
  ON_LOADING: ON_LOADING,
  ON_UNMOUNT: ON_UNMOUNT,
  ON_TOAST: ON_TOAST,
  ERROR: ERROR,
  SUCCESS: SUCCESS,
  CALL: CALL,
  CANCEL: CANCEL,
  CUSTOM: CUSTOM,
  TYPE_NULL: TYPE_NULL,
  TYPE_UNDEFINED: TYPE_UNDEFINED,
  TYPE_STRING: TYPE_STRING,
  TYPE_ARRAY: TYPE_ARRAY,
  TYPE_BOOLEAN: TYPE_BOOLEAN,
  TYPE_OBJECT: TYPE_OBJECT,
  TYPE_FUNCTION: TYPE_FUNCTION,
  TYPE_ERROR: TYPE_ERROR,
  TYPE_SYMBOL: TYPE_SYMBOL,
  TYPE_GENERATOR_FUNCTION: TYPE_GENERATOR_FUNCTION
};

var API_END_POINTS_CONFIG_DEFAULT_VALUE$1 = commonConstants.API_END_POINTS_CONFIG_DEFAULT_VALUE,
    API_END_POINTS_CONFIG_KEYS$1 = commonConstants.API_END_POINTS_CONFIG_KEYS,
    USE_QUERY_CONFIG_KEYS$1 = commonConstants.USE_QUERY_CONFIG_KEYS,
    API_TASK_CONFIG_KEYS$1 = commonConstants.API_TASK_CONFIG_KEYS,
    INFINITE_DATA_HANDLER$1 = commonConstants.INFINITE_DATA_HANDLER,
    DATA_HANDLER$1 = commonConstants.DATA_HANDLER,
    DELETE_DATA_HANDLER$1 = commonConstants.DELETE_DATA_HANDLER,
    UPDATE_DATA_HANDLER$1 = commonConstants.UPDATE_DATA_HANDLER,
    UPDATE_DATA_KEY_HANDLER$1 = commonConstants.UPDATE_DATA_KEY_HANDLER,
    DELETE_DATA_KEY_HANDLER$1 = commonConstants.DELETE_DATA_KEY_HANDLER,
    TOGGLE_DATA_KEY_HANDLER$1 = commonConstants.TOGGLE_DATA_KEY_HANDLER,
    SPLICE_DATA_HANDLER$1 = commonConstants.SPLICE_DATA_HANDLER,
    RESET_HANDLER$1 = commonConstants.RESET_HANDLER,
    CALLBACK_HANDLER$1 = commonConstants.CALLBACK_HANDLER,
    TOAST_HANDLER$1 = commonConstants.TOAST_HANDLER,
    ERROR_HANDLER$1 = commonConstants.ERROR_HANDLER,
    LOADER_HANDLER$1 = commonConstants.LOADER_HANDLER,
    DONT_UPDATE_DATA_HANDLER$1 = commonConstants.DONT_UPDATE_DATA_HANDLER,
    ON_CANCEL_ERROR$1 = commonConstants.ON_CANCEL_ERROR,
    ON_ERROR$1 = commonConstants.ON_ERROR,
    ON_SUCCESS$1 = commonConstants.ON_SUCCESS,
    ON_FINALLY$1 = commonConstants.ON_FINALLY,
    ON_CANCEL$1 = commonConstants.ON_CANCEL,
    ON_REQUEST$1 = commonConstants.ON_REQUEST,
    ON_LOADING$1 = commonConstants.ON_LOADING,
    ON_UNMOUNT$1 = commonConstants.ON_UNMOUNT,
    ON_TOAST$1 = commonConstants.ON_TOAST,
    ERROR$1 = commonConstants.ERROR,
    SUCCESS$1 = commonConstants.SUCCESS,
    CALL$1 = commonConstants.CALL,
    CANCEL$1 = commonConstants.CANCEL,
    CUSTOM$1 = commonConstants.CUSTOM,
    TYPE_NULL$1 = commonConstants.TYPE_NULL,
    TYPE_UNDEFINED$1 = commonConstants.TYPE_UNDEFINED,
    TYPE_STRING$1 = commonConstants.TYPE_STRING,
    TYPE_ARRAY$1 = commonConstants.TYPE_ARRAY,
    TYPE_BOOLEAN$1 = commonConstants.TYPE_BOOLEAN,
    TYPE_OBJECT$1 = commonConstants.TYPE_OBJECT,
    TYPE_FUNCTION$1 = commonConstants.TYPE_FUNCTION,
    TYPE_ERROR$1 = commonConstants.TYPE_ERROR,
    TYPE_SYMBOL$1 = commonConstants.TYPE_SYMBOL,
    TYPE_GENERATOR_FUNCTION$1 = commonConstants.TYPE_GENERATOR_FUNCTION;

exports.API_END_POINTS_CONFIG_DEFAULT_VALUE = API_END_POINTS_CONFIG_DEFAULT_VALUE$1;
exports.API_END_POINTS_CONFIG_KEYS = API_END_POINTS_CONFIG_KEYS$1;
exports.API_METHODS = API_METHODS;
exports.API_TASK_CONFIG_KEYS = API_TASK_CONFIG_KEYS$1;
exports.CALL = CALL$1;
exports.CALLBACK_HANDLER = CALLBACK_HANDLER$1;
exports.CANCEL = CANCEL$1;
exports.CUSTOM = CUSTOM$1;
exports.DATA_HANDLER = DATA_HANDLER$1;
exports.DELETE_DATA_HANDLER = DELETE_DATA_HANDLER$1;
exports.DELETE_DATA_KEY_HANDLER = DELETE_DATA_KEY_HANDLER$1;
exports.DONT_UPDATE_DATA_HANDLER = DONT_UPDATE_DATA_HANDLER$1;
exports.ERROR = ERROR$1;
exports.ERROR_HANDLER = ERROR_HANDLER$1;
exports.FOR_INTERNAL_USE_ONLY = FOR_INTERNAL_USE_ONLY;
exports.HOC_INITIAL_CONFIG_KEY = HOC_INITIAL_CONFIG_KEY;
exports.HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT = HOC_MAIN_CLIENT_SIDE_CONFIG_DEFAULT;
exports.HOC_MAIN_CONFIG_KEY = HOC_MAIN_CONFIG_KEY;
exports.HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT = HOC_MAIN_SERVER_SIDE_CONFIG_DEFAULT;
exports.INFINITE_DATA_HANDLER = INFINITE_DATA_HANDLER$1;
exports.LOADER_HANDLER = LOADER_HANDLER$1;
exports.ON_CANCEL = ON_CANCEL$1;
exports.ON_CANCEL_ERROR = ON_CANCEL_ERROR$1;
exports.ON_ERROR = ON_ERROR$1;
exports.ON_FINALLY = ON_FINALLY$1;
exports.ON_LOADING = ON_LOADING$1;
exports.ON_REQUEST = ON_REQUEST$1;
exports.ON_SUCCESS = ON_SUCCESS$1;
exports.ON_TOAST = ON_TOAST$1;
exports.ON_UNMOUNT = ON_UNMOUNT$1;
exports.RESET_HANDLER = RESET_HANDLER$1;
exports.SPLICE_DATA_HANDLER = SPLICE_DATA_HANDLER$1;
exports.SUCCESS = SUCCESS$1;
exports.TOAST_HANDLER = TOAST_HANDLER$1;
exports.TOGGLE_DATA_KEY_HANDLER = TOGGLE_DATA_KEY_HANDLER$1;
exports.TYPE_ARRAY = TYPE_ARRAY$1;
exports.TYPE_BOOLEAN = TYPE_BOOLEAN$1;
exports.TYPE_ERROR = TYPE_ERROR$1;
exports.TYPE_FUNCTION = TYPE_FUNCTION$1;
exports.TYPE_GENERATOR_FUNCTION = TYPE_GENERATOR_FUNCTION$1;
exports.TYPE_NULL = TYPE_NULL$1;
exports.TYPE_OBJECT = TYPE_OBJECT$1;
exports.TYPE_STRING = TYPE_STRING$1;
exports.TYPE_SYMBOL = TYPE_SYMBOL$1;
exports.TYPE_UNDEFINED = TYPE_UNDEFINED$1;
exports.UPDATE_DATA_HANDLER = UPDATE_DATA_HANDLER$1;
exports.UPDATE_DATA_KEY_HANDLER = UPDATE_DATA_KEY_HANDLER$1;
exports.USE_QUERY_CONFIG_KEYS = USE_QUERY_CONFIG_KEYS$1;
exports.USE_TYPE = USE_TYPE;
exports.commonConstants = commonConstants;
