import { userInfo } from '@/api';
import { useReset } from '@/hooks';

interface UserSate {
  userInfo: {
    menus: AppRoute.RowRoute[]
  }
  accessToken: string
}

export const useUserStore = defineStore('user-store', () => {
  const [state] = useReset<UserSate>({
    userInfo: {
      menus: [],
    },
    accessToken: '',
  });

  // 设置 token
  const setToken = (token: string) => {
    state.value.accessToken = token;
  };

  // 清空 token
  const removeToken = () => {
    state.value.accessToken = '';
  };

  // 获取用户信息
  const getUserInfo = async () => {
    const res = await userInfo();
    state.value.userInfo = res.data;
    return res;
  };

  return {
    ...toRefs(state.value),
    setToken,
    removeToken,
    getUserInfo,
  };
}, {
  persist: {
    pick: ['accessToken'],
  },
});
