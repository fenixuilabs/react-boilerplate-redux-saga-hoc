/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useStore, useDispatch, useSelector, batch } from 'react-redux';
import isEqual from 'fast-deep-equal';
import {
  createSelector,
  // createSelectorCreator,
  // defaultMemoize,
} from 'reselect';
import invariant from 'invariant';
import {
  ON_ERROR,
  ON_SUCCESS,
  ON_LOADING,
  ON_TOAST,
  INFINITE_DATA_HANDLER,
  REDUCER_BASE_PATH,
  REFETCH_API_QUERY,
} from './commonReduxSagaConverter/commonConstants';
import { actionsHandler } from './commonReduxSagaConverter/commonActions';
import { newObject, generateTimeStamp, typeOf } from './helpers';
import {
  filterArrayToastEmptyHandler,
  filterArrayloadingHandler,
  filterArrayToastHandler,
  resetHandler,
  filterArrayResetHandler,
} from './customHandlers';
import nullcheck from './nullCheck';
const cache = {};
const cacheActions = {};
const safe = nullcheck;

export const responseErrorParser = (data = {}) =>
  (Array.isArray(data) &&
    data.reduce((acc, curr) => {
      const [key, message] = Object.entries(curr)[0];
      const payloadKey = key.split(',')[1];
      return {
        ...acc,
        [payloadKey]: message,
      };
    }, {})) ||
  {};

export const commmonStateHandler = ({
  state,
  action,
  newState,
  method,
  constants,
  updateState,
}) => {
  /** This action for initial call  */
  const {
    payload: {
      filter,
      task = {},
      dontUpdateReducer,
      dontUpdateReducerOnCall,
      request,
    } = {},
  } = action;
  if (dontUpdateReducer || dontUpdateReducerOnCall) return state;
  const {
    payload: {
      task: { clearDataOnStart: clearData } = {},
      initialCallData: initialData,
      proxyFor: _proxyFor,
    } = {},
  } = action;
  /** This action for after api gets success or failure  */
  const {
    response: {
      type,
      statusCode,
      message,
      status,
      customTask,
      payload: {
        proxyFor: __proxyFor,
        filter: responseFilter,
        loader: customLoader,
        toast: customToast,
      } = {},
    } = {},
  } = action;
  const ACTION_TYPE = _proxyFor || __proxyFor || type || action.type;
  const ACTION_PROXY_TYPE = _proxyFor || __proxyFor || type;
  const loader = Object.keys(constants).includes(action.type);
  let State = newObject(state);
  if (
    ((method === ON_LOADING ||
      loader ||
      [ON_SUCCESS, ON_ERROR].includes(method)) &&
      !customTask) ||
    (customLoader !== undefined &&
      customTask &&
      (Array.isArray(method) ? method : [method]).includes(ON_LOADING))
  ) {
    if ((status || loader) && filter && filter.length > 0)
      State = newState(({ [ACTION_TYPE]: obj }) => ({
        [ACTION_TYPE]: newObject(
          obj,
          filterArrayToastEmptyHandler({
            isInfinite: task.name === INFINITE_DATA_HANDLER,
            filter: (Array.isArray(filter) && filter) || [filter],
          })(obj),
        ),
      }));
    else if (status || loader)
      State = newState(({ [ACTION_TYPE]: obj }) => ({
        [ACTION_TYPE]: newObject(obj, ({ toast = {} }) => ({
          toast: newObject(toast, {
            message: '',
            status: '',
            isError: false,
            key: '',
          }),
        })),
      }));
    if (
      ((filter || responseFilter) && !customTask
        ? (filter || responseFilter).length > 0
        : false) ||
      (customTask &&
        customLoader !== undefined &&
        (filter || responseFilter || []).length > 0)
    )
      State = newObject(State, ({ [ACTION_TYPE]: obj }) => ({
        [ACTION_TYPE]: newObject(
          obj,
          filterArrayloadingHandler({
            filter: (Array.isArray(filter || responseFilter) &&
              (filter || responseFilter)) || [filter || responseFilter],
            ...(request ? { ...request, payload: undefined } : {}),
            loader:
              customTask && customLoader !== undefined
                ? customLoader
                : initialData
                ? false
                : [ON_SUCCESS, ON_ERROR].includes(method)
                ? false
                : status || loader,
            clearData,
            initialData,
          })(obj),
        ),
      }));
    else
      State = newObject(State, ({ [ACTION_TYPE]: obj }) => ({
        [ACTION_TYPE]: newObject(obj, ({ data: _data }) => ({
          loading: {
            status:
              customTask && customLoader !== undefined
                ? customLoader
                : initialData
                ? false
                : [ON_SUCCESS, ON_ERROR].includes(method)
                ? false
                : status || loader,
            lastUpdated: generateTimeStamp(),
          },
          ...(request ? { ...request, payload: undefined } : {}),
          initialState: false,
          ...((clearData || initialData) &&
          ![ON_SUCCESS, ON_ERROR].includes(method)
            ? { data: initialData || (Array.isArray(_data) ? [] : {}) }
            : {}),
        })),
      }));
    if (method === ON_LOADING || loader) return State;
  }
  if (
    ([ON_SUCCESS, ON_ERROR].includes(method) &&
      // [200, 201, 400, 403, 404, 409, 500].includes(statusCode) &&
      Object.keys(constants).includes(ACTION_PROXY_TYPE) &&
      !customTask) ||
    (customToast &&
      customTask &&
      (Array.isArray(method) ? method : [method]).includes(ON_TOAST))
  ) {
    if (responseFilter && responseFilter.length > 0)
      State = newObject(State, ({ [ACTION_PROXY_TYPE]: obj }) => ({
        [ACTION_PROXY_TYPE]: newObject(
          obj,
          filterArrayToastHandler({
            statusCode,
            filter: (Array.isArray(responseFilter) && responseFilter) || [
              responseFilter,
            ],
            message,
            type: ACTION_PROXY_TYPE,
            ...(customToast &&
            customTask &&
            (Array.isArray(method) ? method : [method]).includes(ON_TOAST)
              ? customToast
              : {}),
          })(obj),
        ),
      }));
    else
      State = newObject(State, ({ [ACTION_PROXY_TYPE]: obj }) => ({
        [ACTION_PROXY_TYPE]: newObject(obj, {
          toast: {
            isError: ![200, 201].includes(statusCode),
            status: statusCode,
            message,
            key: ACTION_PROXY_TYPE,
            lastUpdated: generateTimeStamp(),
            ...(customToast &&
            customTask &&
            (Array.isArray(method) ? method : [method]).includes(ON_TOAST)
              ? customToast
              : {}),
          },
          initialState: false,
        }),
      }));
  }
  const changeState = newObject.bind({}, State);
  const reset =
    responseFilter && responseFilter.length > 0
      ? filterArrayResetHandler.bind(
          {},
          state,
          newState,
          action,
          responseFilter,
        )
      : resetHandler.bind({}, state, newState, action);
  return updateState({
    state: State,
    newState: changeState,
    action,
    reset,
  });
};

export const getData = (data, def, loader = true, filter = []) => ({
  ...safe(data, `${filter.length ? '.data.' : ''}${filter.join('.')}`, {}),
  data: safe(
    data,
    `.data${filter.length ? '.' : ''}${filter.join('.')}${
      filter.length ? '.data' : ''
    }`,
    def,
  ),
  loader: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.loading.status`,
    typeof loader !== 'boolean' ? false : loader,
  ),
  lastUpdated: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.lastUpdated`,
  ),
  isInfinite: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.isInfinite`,
    false,
  ),
  infiniteEnd: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.infiniteEnd`,
    false,
  ),
  isError: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.isError`,
    false,
  ),
  toast: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.toast`,
    {},
  ),
  error: safe(
    data,
    `${filter.length ? '.data.' : ''}${filter.join('.')}.error`,
    {},
  ),
});

export const mapDispatchToProps = (
  actions,
  componentData,
  reducerName,
) => dispatch => ({
  dispatch,
  ...(actions && Object.keys(actions).length
    ? newObject(componentData, ({ [`${reducerName}_hoc`]: data }) => ({
        [`${reducerName}_hoc`]: newObject(data, {
          actions: bindActionCreators(actions, dispatch),
        }),
      }))
    : {}),
});

const checkKey = (key, name, dataType, message) => {
  invariant(
    typeOf(key) === dataType,
    `(react-boilerplate-redux-saga-hoc)  Expected \`${name}\` to be  ${message ||
      dataType}`,
  );
};
const checkKeyWithMessage = (key, dataType, message) => {
  invariant(typeOf(key) === dataType, message);
};
const previousData = new Map();
const initialRender = new Map();
const previousCallbackData = new Map();
const previousDependencyArrayData = new Map();
const isPreviousDependencyArrayCheckPassed = new Map();

const exeuteRequiredData = (_data, e = {}) => {
  const initialData = (e.requiredKey || []).reduce(
    (acc, _reqKey) => ({
      ...acc,
      ...(_reqKey && typeOf(_reqKey.key || _reqKey) === 'string'
        ? typeOf(_reqKey) === 'string'
          ? { [_reqKey]: undefined }
          : { [_reqKey.key]: _reqKey.default }
        : {}),
    }),
    {},
  );

  return e &&
    e.requiredKey &&
    Array.isArray(e.requiredKey) &&
    e.requiredKey.length > 0 &&
    typeOf(_data) === 'object'
    ? e.requiredKey.reduce(
        (acc, _reqKey) => ({
          ...acc,
          ...(_reqKey && typeOf(_reqKey.key || _reqKey) === 'string'
            ? {
                [_reqKey.key || _reqKey]:
                  typeOf(_data[_reqKey.key || _reqKey]) !== undefined
                    ? _data[_reqKey.key || _reqKey]
                    : _reqKey.default,
              }
            : {}),
        }),
        { ...initialData },
      )
    : e && e.requiredKey
    ? _data || { ...initialData }
    : _data;
};
const _checkFilter = e =>
  e && e.filter
    ? Array.isArray(e.filter)
      ? e.filter
      : typeof e.filter === 'string'
      ? [e.filter]
      : undefined
    : undefined;

const _getData = (ee = {}, isString, _state, name, array) => {
  const state = _state || {};
  const _getDataFunc = e => {
    // const regex = `app\/containers\/${name}\/+.*?_CALL`;
    const regex = REDUCER_BASE_PATH.concat(name, '/+.*?_CALL');
    const isSearchMatched =
      ((isString ? array : e.key) || '').search(regex) > -1;
    return (typeof e.defaultDataFormat === 'boolean' ||
    !isSearchMatched ||
    !(isString ? array : e.key)
    ? !e.defaultDataFormat || !isSearchMatched || !(isString ? array : e.key)
    : false)
      ? (isString
        ? array
        : e.key)
        ? safe(
            state,
            `[${isString ? array : e.key}]${e.query ? e.query : ''}`,
            e.default,
          )
        : // : name
          // ? safe(state, `${e.query ? e.query : ''}`, e.default)
          safe(state, `${e.query ? e.query : ''}`, e.default)
      : safe(
          getData(
            safe(state, `[${isString ? array : e.key}]`),
            e.query ? undefined : e.default || undefined,
            e.initialLoaderState || false,
            _checkFilter(e),
            e.dataQuery,
          ),
          `${e.query && typeOf(e.query) === 'string' ? e.query : ''}`,
          e.query
            ? e.default !== undefined
              ? e.default
              : undefined
            : undefined,
        );
  };
  return Array.isArray(ee.query)
    ? ee.query.reduce(
        (acc, _query) =>
          acc.concat([
            _getDataFunc({
              ...ee,
              query: _query.key || _query,
              default: _query.default || undefined,
            }),
          ]),
        [],
      )
    : _getDataFunc(ee);
};
const _GetData = (_state, name, array, config) => {
  const state = _state || {};
  let _data = {};
  if (
    name &&
    ((Array.isArray(array) && array.length > 0) ||
      (typeOf(array) === 'object' && Object.keys(array).length > 0))
  ) {
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-underscore-dangle
    _data = (typeOf(array) === 'object' ? [array] : array).reduce(
      (acc, e) => {
        if (typeOf(e) === 'object') {
          if (typeOf(array) === 'object')
            return exeuteRequiredData(
              _getData(e, undefined, state, name, array),
              e,
            );
          const _arr = acc.slice();
          _arr.push(
            exeuteRequiredData(_getData(e, undefined, state, name, array), e),
          );
          return _arr;
        }
        // Below condition ( one config for all the keys )
        if (typeOf(e) === 'string' && typeOf(config) === 'object') {
          const _config = { key: e, ...config };
          if (typeOf(array) === 'object')
            return exeuteRequiredData(
              _getData(_config, undefined, state, name, array),
              _config,
            );
          const _arr = acc.slice();
          _arr.push(
            exeuteRequiredData(
              _getData(_config, undefined, state, name, array),
              _config,
            ),
          );
          return _arr;
        }
        if (typeOf(array) === 'object') return safe(state, `[${e.key}]`);
        const _arr = acc.slice();
        _arr.push(safe(state, `[${e}]`));
        return _arr;
      },
      typeOf(array) === 'object' ? {} : [],
    );
    // if()
  } else if (typeof array === 'string' && config && typeOf(config) === 'array')
    _data = config.reduce(
      (acc, _config) => [
        ...acc,
        exeuteRequiredData(
          _getData(_config, true, state, name, array),
          _config,
        ),
      ],
      [],
    );
  else if (typeof array === 'string')
    _data = exeuteRequiredData(
      _getData(config, true, state, name, array),
      config,
    );
  else if (name) _data = state;
  else _data = state || {};
  return _data;
};
const _execute = (state, name, array, config, _key, callback) => {
  let _queryData = previousData.get(_key);
  const isPassed = isPreviousDependencyArrayCheckPassed.get(_key);
  if (
    (name,
    config &&
      config.dependencyArray &&
      !Array.isArray(config.dependencyArray)) &&
    !isPassed
  ) {
    invariant(
      false,
      `dependencyArray expected an array but got ${typeOf(
        config.dependencyArray,
      )}`,
    );
  } else if (
    isPassed ||
    (config && config.dependencyArray && Array.isArray(config.dependencyArray))
  ) {
    if (
      !isPassed &&
      config.dependencyArray.filter(e => typeof e !== 'string')[0]
    )
      invariant(false, 'dependencyArray must be array of string');
    else {
      if (!isPassed) isPreviousDependencyArrayCheckPassed.set(_key, true);
      const _next = config.dependencyArray.map(_e => safe(state, _e));
      const _previous = previousDependencyArrayData.get(_key);
      previousDependencyArrayData.set(_key, _next);
      if (isEqual(_previous, _next)) {
        return {
          isEqualCheck: true,
          data: previousCallbackData.get(_key) || _queryData,
        };
      }
    }
  }
  const _data = _GetData(state, name, array, config);
  const _isEqual = isEqual(_data, _queryData);
  if (!_isEqual) {
    let callbackData;
    previousData.set(_key, _data);
    if (callback && typeof callback === 'function')
      callbackData = callback(_data);
    if (callbackData) {
      _queryData = callbackData;
      previousCallbackData.set(_key, callbackData);
    } else {
      previousCallbackData.set(_key, null);
      _queryData = _data;
    }
  } else _queryData = previousCallbackData.get(_key) || _queryData;
  previousData.set(_key, _data);
  return {
    data: _queryData,
  };
};
export const useQuery = (
  _name = null,
  _array = [],
  __config = {},
  _callback,
  _callbackSuccess,
  { refreshKey: _refreshKey = undefined } = {},
) => {
  const {
    reducerName: name,
    key: array,
    config,
    callback,
    callbackSuccess,
    refreshKey,
  } =
    typeOf(_name) === 'object'
      ? _name
      : {
          reducerName: _name,
          key: _array,
          config: __config,
          callback: _callback,
          callbackSuccess: _callbackSuccess,
          refreshKey: _refreshKey,
        };
  if (name) checkKey(name, 'reducer name', 'string', 'valid string');
  // const store = useStore();
  const [_key] = useState({});

  useEffect(() => {
    previousData.set(_key, {});
    initialRender.set(_key, true);
    return () => {
      previousData.delete(_key);
      previousCallbackData.delete(_key);
      initialRender.delete(_key);
      previousDependencyArrayData.delete(_key);
    };
  }, []);
  const equalityCheckFunction = useCallback((e, f) => {
    const _isEqual =
      typeof e.isEqualCheck === 'undefined'
        ? isEqual(e.data, f.data)
        : e.isEqualCheck;
    if (
      (!_isEqual || initialRender.get(_key)) &&
      typeof callbackSuccess === 'function'
    ) {
      initialRender.set(_key, false);
      callbackSuccess(e.data /* Updated Data */, f.data /* Previous Data */);
    }
    return _isEqual;
  }, []);
  const selectReducerKey = useMemo(() => {
    const _arr = [];
    const executeRequiredKey = _requiredKey =>
      _requiredKey.forEach(e => {
        if (typeof e === 'string') _arr.push(e);
        else if (typeOf(e) === 'object' && e.key) _arr.push(e.key);
      });
    if (typeof array === 'string' && array) _arr.push(array);
    else if (Array.isArray(array) || typeOf(array) === 'object')
      (Array.isArray(array) ? array : [array]).forEach(arr => {
        if (typeof arr === 'string') _arr.push(arr);
        else if (typeOf(arr) === 'object') {
          if (arr.key) {
            _arr.push(arr.key);
          } else if (
            Array.isArray(arr.requiredKey) &&
            arr.requiredKey.length > 0
          ) {
            executeRequiredKey(arr.requiredKey);
          } else if (arr.query) {
            const getKey = _query =>
              _query[0] === '.' ? _query.split('.')[1] : _query.split('.')[0];
            if (typeof arr === 'string') _arr.push(getKey(arr));
            else if (Array.isArray(arr.query) && arr.query.length > 0)
              arr.query.forEach(e => {
                if (typeof e === 'string') _arr.push(getKey(e));
                else if (typeOf(e) === 'object' && e.key)
                  _arr.push(getKey(e.key));
              });
          }
        }
      });
    return _arr;
  }, [refreshKey]);
  const selectState = useMemo(() => {
    if (selectReducerKey && selectReducerKey.length) {
      const _arr = [];
      selectReducerKey.forEach(_k =>
        _arr.push(state => state[name] && state[name][_k]),
      );
      if (_arr.length > 0) return _arr;
    }
    return [state => state[name]];
  }, [selectReducerKey]);
  const executeSelector = useCallback(
    (...rest) => {
      if (
        selectReducerKey.length > 0 ||
        (typeOf(array) === 'object' && !array.key && array.requiredKey)
      ) {
        if (typeOf(array) === 'object' && !array.key && array.requiredKey) {
          if (Array.isArray(array.requiredKey) && array.requiredKey.length)
            return {
              data: array.requiredKey.reduce((acc, curr, i) => {
                if (typeOf(curr) === 'object')
                  return {
                    ...acc,
                    [curr]:
                      rest[i] === undefined ? curr && curr.default : rest[i],
                  };
                return { ...acc, [curr]: rest[i] };
              }, {}),
            };
          return { data: {} };
        }
        const _stateObj = selectReducerKey.reduce(
          (acc, curr, i) => ({ ...acc, [curr]: rest[i] }),
          {},
        );
        return _execute(_stateObj, name, array, config, _key, callback);
      }
      return _execute(rest[0], name, array, config, _key, callback);
    },
    [selectReducerKey, refreshKey],
  );
  const createdSelector = useMemo(
    () => createSelector(selectState, executeSelector),
    [executeSelector, selectState],
  );
  const _selectorData = useSelector(
    !name || !array
      ? state => _execute(state, name, array, config, _key, callback)
      : createdSelector,
    !name || !array ? undefined : equalityCheckFunction,
  );
  return _selectorData.data;
};
/* example
 * const actions = useActions('newActions', {
 *   new: () => {
 *       // redux-thunk
 *       return dispatch => {
 *         console.log(dispatch);
 *         return {
 *           type: 'fjjf',
 *         };
 *       };
 *     },
 * });
 * actions.new();
 * console.log(actions, 'actions');
 */

export const useActionsHook = (name = '', actions = {}) => {
  const dispatch = useDispatch();
  const [dispatchAction, setDispatchAction] = useState(
    !actions ? cacheActions[name] || {} : bindActionCreators(actions, dispatch),
  );
  useEffect(() => {
    if (!isEqual(cacheActions[name], actions)) {
      cacheActions[name] = actions;
      cache[name] = bindActionCreators(actions, dispatch);
      setDispatchAction(cache[name]);
    } else setDispatchAction(cache[name]);
  }, [isEqual(cacheActions[name], actions)]);
  return dispatchAction;
};
/* example
 * const mutateState = useMutation(reducerName);
 * mutateState({
 *   key: DEMP_API,
 *   value: {
 *     data: {}
 *   }
 *   filter: []
 * })
 */
export const useMutation = reducerName => {
  if (!reducerName)
    checkKeyWithMessage(
      reducerName,
      'string',
      'useMutation(`reducerkey`) : Expected a valid reducer key',
    );
  const store = useStore();

  useEffect(() => {
    if (reducerName)
      checkKeyWithMessage(
        reducerName,
        'string',
        'useMutation(`reducerkey`) : Expected a reducer key to be string',
      );
    if (!store.getState()[reducerName])
      checkKeyWithMessage(
        null,
        'string',
        ` reducerName '${reducerName}' not a valid reducer key.`,
      );
  }, []);

  const dispatch = useDispatch();
  const _callback = useCallback(({ key: type, value, filter = [] }) => {
    if (!type) checkKey(null, 'key', 'string', 'valid string');
    const _reducer_keys = Object.keys(store.getState()[reducerName]);
    if (type)
      invariant(
        _reducer_keys.includes(type),
        // type.includes('_CALL') && type.slice(-5) === '_CALL',
        `'key' is invalid.${type} not found in ${reducerName} reducer`,
      );
    checkKey(filter, 'filter', 'array');
    checkKey(type, 'key', 'string');
    // const regex = `app\/containers\/${reducerName}\/+.*?_CALL`;
    const regex = REDUCER_BASE_PATH.concat(reducerName, '/+.*?_CALL');
    const isSearchMatched = (type || '').search(regex) > -1;
    if (
      type.includes('_CALL') &&
      type.slice(-5) === '_CALL' &&
      isSearchMatched &&
      filter &&
      Array.isArray(filter)
    ) {
      // checkKey(value, 'value', 'object');
      console.log(store.getState()[reducerName][type]);
      dispatch({
        type: type.slice(0, -4).concat('CUSTOM_TASK'),
        response: {
          type,
          method: ON_SUCCESS,
          statusCode: 200,
          mutation: true,
          customTask: true,
          data: {
            data:
              typeof value === 'function'
                ? value(
                    safe(
                      store.getState()[reducerName][type],
                      `.data${filter.length ? '.' : ''}${filter.join('.')}`,
                    ),
                    type,
                  )
                : value,
          },
          payload: {
            filter,
          },
        },
      });
    } else
      dispatch({
        type: `${reducerName}_MUTATE_STATE`,
        payload: {
          [type]:
            typeof value === 'function'
              ? value(store.getState()[reducerName][type])
              : value,
        },
      });
  }, []);
  return _callback;
};
/* example
 * async function() {
 *   const { data, status } = await toPromise(DEMP_API_CALL, { task: 'Data-Handler' });
 * }
 */
export const toPromise = (action, config = {}, isReject, dispatch) => {
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined')
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a config (second parameter) to be object`,
    );
  return new Promise((resolve, reject) =>
    typeof dispatch === 'function'
      ? dispatch(action({ ...config, resolve, reject, isReject }))
      : action({ ...config, resolve, reject, isReject }),
  );
};
/* example
 * const asyncFunction = toPromiseFunction(DEMP_API_CALL);
 * async function() {
 *   const { data, status } = await asyncFunction({ task: 'Data-Handler' });
 * }
 */
export const toPromiseFunction = (action, dispatch) => (config, isReject) => {
  if (typeOf(config) !== 'null' || typeOf(config) !== 'undefined')
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a config (first parameter) to be object`,
    );
  return new Promise((resolve, reject) =>
    typeof dispatch === 'function'
      ? dispatch(action({ ...config, resolve, reject, isReject }))
      : action({ ...config, resolve, reject, isReject }),
  );
};

/* example
 *  const execute = toPromiseAllFunction([DEMO_URL_CALL, DEMO_API_URL_CALL]);
 *  const asyncfunc = async () => {
 *      try {
 *        const data = await execute([],{ isReject: false });
 *        console.log(data, '=============');
 *      } catch (err) {
 *        console.log(err);
 *      }
 *    };
 *    asyncfunc();
 */
export const toPromiseAllFunction = (actions = [], dispatch) => (
  config = [],
  defaultConfig = {},
) => {
  if (
    typeOf(config) !== 'null' &&
    typeOf(config) !== 'undefined' &&
    typeOf(config) !== 'array'
  )
    checkKeyWithMessage(
      config,
      'object',
      `toPromise() : Expected a (first parameter) to be an Array or Object`,
    );
  return Promise.all(
    actions.map(
      (action, i) =>
        new Promise((resolve, reject) => {
          const CONFIG = {
            ...((typeOf(config) === 'object'
              ? config
              : config[i] && config[i].config) ||
              defaultConfig.config ||
              {}),
            resolve,
            reject,
            isReject: !!(typeOf(config) === 'object'
              ? config.isReject || defaultConfig.isReject
              : (config[i] && config[i].isReject) || defaultConfig.isReject),
          };
          return typeof dispatch === 'function'
            ? dispatch(action(CONFIG))
            : action(CONFIG);
        }),
    ),
  );
};

const CACHE = {};

function stringify(val) {
  return typeof val === 'object' ? JSON.stringify(val) : String(val);
}

function hashArgs(...args) {
  return args.reduce((acc, arg) => `${stringify(arg)}:${acc}`, '');
}
/* example => used for background refresh it won't trigger the loader everytime api starts
 * const pollingConfig = {
 *   request: {
 *     polling: true,
 *     delay: 8000,
 *   },
 * };
 * const CALL_ON_MOUNT = true
 * const [refresh, isUpdating] = useStaleRefresh(
 *   VENDORS_GET_DASBOARD_API_CALL,
 *   VENDORS_GET_DASBOARD_API,
 *   pollingConfig,
 *   CALL_ON_MOUNT // calls api once mounted
 * );
 * const [fetchOrders, isUpdating] = useStaleRefresh(
 *   VENDORS_GET_ORDERS_BY_DAY_API_CALL,
 *   VENDORS_GET_ORDERS_BY_DAY_API,
 *   pollingConfig,
 * );
 * useEffect(() => {
 *   function pollingStart() {
 *     /// fetchOrders({loader, clearData, config}); optional parameters
 *     fetchOrders();
 *   }
 *   function pollingEnd() {
 *     VENDORS_GET_DASBOARD_API_CANCEL();
 *     VENDORS_GET_ORDERS_BY_DAY_API_CANCEL();
 *   }
 *   pollingStart();
 *   window.addEventListener('online', pollingStart);
 *   window.addEventListener('offline', pollingEnd);
 *   return () => {
 *     window.removeEventListener('online', pollingStart);
 *     window.removeEventListener('offline', pollingEnd);
 *     VENDORS_GET_DASBOARD_API_CANCEL();
 *     VENDORS_GET_ORDERS_BY_DAY_API_CANCEL();
 *   };
 * }, []);
 */
export function useStaleRefresh(
  fn,
  name, // reducer constants
  arg = {},
  initial,
  // initialLoadingstate = true,
) {
  const prevArgs = useRef(null);
  const [isUpdating, setIsUpdating] = useState(null);
  const refresh = useCallback(
    ({ loader, clearData, config } = {}) => {
      const args = config || arg;
      const cacheID = hashArgs(name, args);
      // look in cache and set response if present
      // fetch new data
      if (CACHE[cacheID]) setIsUpdating(true);
      toPromise(
        fn,
        Object.assign(
          {},
          args,
          CACHE[cacheID] && !loader ? { initialCallData: CACHE[cacheID] } : {},
          clearData
            ? {
                task: args.task
                  ? { ...args.task, clearDataOnStart: true }
                  : { clearDataOnStart: true },
              }
            : {},
        ),
      ).then(newData => {
        if (CACHE[cacheID]) setIsUpdating(false);
        if (newData && newData.status === 'SUCCESS') {
          CACHE[cacheID] = newData.data;
          // setData(newData);
        }
        // setLoading(false);
      });
    },
    [arg, initial],
  );

  useEffect(() => {
    // args is an object so deep compare to rule out false changes
    if (isEqual(arg, prevArgs.current)) {
      return;
    }
    if (initial) refresh();
    // cacheID is how a cache is identified against a unique request
  }, [arg, fn, name, initial]);

  useEffect(() => {
    prevArgs.current = arg;
  });

  return [refresh, isUpdating];
}
/* example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */
export const useMutateReducer = reducerName => {
  const store = useStore();
  const dispatch = useDispatch();
  const _callback = useCallback(callback => {
    const state = reducerName
      ? store.getState()[reducerName]
      : store.getState();
    const newState = callback(state);
    if (newState)
      dispatch({
        type: reducerName ? `${reducerName}_MUTATE_STATE` : 'MUTATE_STATE',
        payload: newState || {},
      });
  }, []);
  return _callback;
};
/* example
 * const mutateReducer = useMutateReducer(reducerName);
 * mutateReducer(state => state)
 */
export const useCancelAllRunningApiCalls = reducerName => {
  if (!reducerName)
    checkKeyWithMessage(
      reducerName,
      'string',
      'useCancelAllRunningApiCalls(`reducerkey`) : Expected a valid reducer key',
    );
  const store = useStore();
  const dispatch = useDispatch();
  const _callback = useCallback((dontCancelKeys = []) => {
    const state = store.getState()[reducerName];
    const actions = Object.entries(state).reduce((acc, [key, value]) => {
      const regex = REDUCER_BASE_PATH.concat(reducerName, '/+.*?_CALL');
      const isSearchMatched = (key || '').search(regex) > -1;
      const _dontCancelKeys = Array.isArray(dontCancelKeys)
        ? dontCancelKeys
        : [];
      if (
        key &&
        key.includes('_CALL') &&
        key.slice(-5) === '_CALL' &&
        isSearchMatched &&
        safe(value, '.loading.status', false) &&
        !_dontCancelKeys.includes(key)
      )
        return acc.concat([
          {
            type: key.replace('_CALL', '_CANCEL'),
          },
        ]);
      return acc;
    }, []);
    if (actions && actions.length > 0) {
      batch(() => {
        for (let i = 0; i < actions.length; i++) {
          dispatch(actions[i]);
        }
      });
    }
  }, []);
  return _callback;
};
/* example
 * const resetState = useResetState(reducerName);
 * const dontResetKeys = ['isLoggedIn'];
 * resetState(dontResetKeys); it will reset state to initial state except some dontResetKeys
 */
export const useResetState = reducerName => {
  const dispatch = useDispatch();
  const _callback = useCallback((dontResetKeys = []) => {
    dispatch({
      type: reducerName ? `${reducerName}_RESET_STATE` : 'RESET_STATE',
      payload: dontResetKeys,
    });
  }, []);
  return _callback;
};
/* example
 * const resetState = useResetOnlyApiEndPointsState(reducerName);
 * const dontResetKeys = ['isLoggedIn'];
 * resetState(dontResetKeys); it will reset only endpoints to initial state except some dontResetKeys
 */
export const useResetOnlyApiEndPointsState = reducerName => {
  const dispatch = useDispatch();
  const _callback = useCallback((dontResetKeys = []) => {
    dispatch({
      type: reducerName ? `${reducerName}_RESET_API` : 'RESET_API',
      payload: dontResetKeys,
    });
  }, []);
  return _callback;
};
/* example
 * const { reducerConstants: { DEMO_API } } = useDemoApi;
 * const refetchApi = useRefetchCachedApi(DEMO_API);
 * refetchApi();
 */
export const useRefetchCachedApi = reducerkey => {
  if (!reducerkey)
    checkKeyWithMessage(
      reducerkey,
      'string',
      'useRefetchApi(`reducerkey`) : Expected a valid reducer key',
    );
  const dispatch = useDispatch();
  const _callback = useCallback(key => {
    const regex = REDUCER_BASE_PATH.concat('+.*?_CALL');
    const isSearchMatched = reducerkey.search(regex) > -1;
    if (isSearchMatched)
      dispatch({
        type: reducerkey,
        payload: {
          actionCallType: REFETCH_API_QUERY,
          request: {
            key,
          },
        },
      });
  }, []);
  return _callback;
};
/* example
 * const IS_QUERY_DATA = true;
 * const IS_MUTATION = true;
 * const { reducerConstants: { DEMO_API } } = useDemoApi;
 * const {action: {call,cancel},mutate,data } = useApiQuery(DEMO_API,IS_QUERY_DATA,IS_MUTATION);
 * call();
 * mutate({value: data => data, filter: ['list']})
 */
export const useApiQuery = (reducerkey, isQueryData, isMutation) => {
  if (!reducerkey)
    checkKeyWithMessage(
      reducerkey,
      'string',
      'useRefetchApi(`reducerkey`) : Expected a valid reducer key',
    );
  let data;
  let mutation;
  const reducerName = reducerkey.split('/')[2];
  const ref = useRef({ isQueryData, isMutation });
  const dispatch = useDispatch();
  if (ref.current.isMutation) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    mutation = useMutation(reducerName);
  }
  if (ref.current.isQueryData) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    data = useQuery(reducerName, { key: reducerkey, default: {} });
  }
  const _action = useMemo(() => {
    const regex = REDUCER_BASE_PATH.concat('+.*?_CALL');
    const isSearchMatched = reducerkey.search(regex) > -1;
    if (isSearchMatched)
      return {
        action: {
          call: (...rest) => dispatch(actionsHandler.call(reducerkey)(...rest)),
          cancel: (...rest) =>
            dispatch(actionsHandler.cancel(reducerkey)(...rest)),
          custom: (...rest) =>
            dispatch(actionsHandler.custom(reducerkey)(...rest)),
        },
        mutate: mutation
          ? ({ value: _value, filter: _filter }) => {
              mutation({
                key: reducerkey,
                value: _value,
                filter: _filter,
              });
            }
          : undefined,
      };
    checkKeyWithMessage(
      null,
      'string',
      `useApiQuery(${reducerkey}) : Expected a valid reducer key`,
    );
    return {};
  }, []);
  return { ..._action, data, type: reducerkey };
};
