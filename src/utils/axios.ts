import type { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { router } from '@/router';
import { useUserStore } from '@/stores/user';
import { $t, i18n } from '@/utils';
import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import qs from 'qs';

const pendingMap = new Map();
let loading: any;
let requestCount: number = 0;

function createAxios<Data = any, T = AppAxios.ApiPromise<Data>>(axiosConfig: AxiosRequestConfig, options: AppAxios.Options = {}): T {
  // 获取用户信息
  const userStore = useUserStore();

  const serviceConfig: CreateAxiosDefaults = {
    baseURL: '',
    timeout: 0,
    paramsSerializer: (params) => {
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value != null),
      );
      return qs.stringify(filteredParams, { arrayFormat: 'repeat' });
    },
  };
  if (import.meta.env.VITE_APP_ENV !== 'dev')
    serviceConfig.baseURL = import.meta.env.VITE_BASE_URL;

  // 创建 axios
  const service = axios.create(serviceConfig);

  // 默认配置
  const config: AppAxios.Options = {
    cancelDuplicateRequest: true,
    loading: false,
    loadingText: $t('axios.loadingText'),
    message: false,
    messageText: '',
    showErrorMessage: true,
  };

  // 如果有传入配置，则合并配置，否则使用默认配置
  options = Object.assign(config, options);

  // 接口请求之前拦截
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // console.log(config, '请求拦截器');
      removePending(config);
      // 取消重复请求
      if (options.cancelDuplicateRequest)
        addPending(config);

      // 显示 Loading
      if (options.loading)
        createLoading(options.loadingText);

      // 自动携带 token
      if (userStore.accessToken) {
        config.headers.Authorization = `Bearer ${userStore.accessToken}`;
      }

      // 自动携带当前语言
      config.headers['Accept-Language'] = i18n.global.locale.value;

      return config;
    },
    (error) => {
      // console.log(error, '请求拦截器: error');
      return Promise.reject(error);
    },
  );

  // 接口请求响应后拦截
  service.interceptors.response.use(
    async (response: AxiosResponse<any>) => {
      // console.log(response, '响应拦截器');
      const { data, config } = response;
      // 删除重复请求
      removePending(config);
      // 关闭loading
      if (options.loading)
        closeLoading();

      // 登录过期
      if (data.code === 1) {
        await router.push('/login');
        userStore.handleReset();
        ElMessage.error({
          message: data.message,
        });
        return Promise.reject(data);
      }

      // 提示错误信息
      if (data.code !== 200) {
        ElMessage.error({
          message: data.message,
          duration: 5000,
        });
        // 不等于 0 时, 页面中具体逻辑不执行
        return Promise.reject(data);
      }

      // 是否需要提示
      if (options.message) {
        // 自定义消息提示权重大于接口返回消息提示
        const message = options.messageText ? options.messageText : data.message;
        ElMessage.success(message);
      }

      return data;
    },
    (error) => {
      // console.log(error, '响应错误拦截器');
      // 删除重复请求
      if (error.config)
        removePending(error.config);

      // 关闭loading
      if (options.loading)
        closeLoading();

      // 处理错误状态码
      if (options.showErrorMessage)
        httpErrorStatusHandle(error);

      return Promise.reject(error);
    },
  );

  return service(axiosConfig) as T;
}

export default createAxios;

/**
 * 获取每个请求唯一的key
 */
function getPendingKey(config: InternalAxiosRequestConfig) {
  let { data } = config;
  const { url, method, params } = config;
  if (typeof data === 'string')
    data = qs.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, qs.stringify(params), qs.stringify(data)].join('&');
}

/**
 * 储存每个请求唯一值, 也就是 cancel() 方法, 用于取消请求
 */
function addPending(config: InternalAxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  config.cancelToken
    = config.cancelToken
    || new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
}

/**
 * 删除重复的请求
 */
function removePending(config: InternalAxiosRequestConfig) {
  const pendingKey = getPendingKey(config);
  if (pendingMap.get(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
}

/**
 * 创建 Loading
 */
function createLoading(text?: string) {
  if (requestCount === 0) {
    loading = ElLoading.service({
      text,
      background: 'rgba(0, 0, 0, 0.7)',
    });
    requestCount++;
  }
}

/**
 * 关闭 Loading
 */
function closeLoading() {
  requestCount--;
  if (requestCount === 0)
    loading.close();
}

/**
 * 处理异常
 */
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error(`${$t('axios.errorStatus.cancel')}${error.message}`);
  let message = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        message = $t('axios.errorStatus.302');
        break;
      case 400:
        message = $t('axios.errorStatus.400');
        break;
      case 401:
        message = $t('axios.errorStatus.401');
        break;
      case 403:
        message = $t('axios.errorStatus.403');
        break;
      case 404:
        message = `${$t('axios.errorStatus.404')}: ${error.response.config.url}`;
        break;
      case 408:
        message = $t('axios.errorStatus.408');
        break;
      case 409:
        message = $t('axios.errorStatus.409');
        break;
      case 500:
        message = $t('axios.errorStatus.500');
        break;
      case 501:
        message = $t('axios.errorStatus.501');
        break;
      case 502:
        message = $t('axios.errorStatus.502');
        break;
      case 503:
        message = $t('axios.errorStatus.503');
        break;
      case 504:
        message = $t('axios.errorStatus.504');
        break;
      case 505:
        message = $t('axios.errorStatus.505');
        break;
      default:
        message = $t('axios.errorStatus.default');
        break;
    }
  }
  if (error.message.includes('timeout'))
    message = $t('axios.errorStatus.timeout');
  if (error.message.includes('Network'))
    message = window.navigator.onLine ? $t('axios.errorStatus.abnormal') : $t('axios.errorStatus.disconnect');
  ElMessage.error(message);
}
