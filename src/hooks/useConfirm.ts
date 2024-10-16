import { $t } from '@/utils';
import { ElMessage, ElMessageBox } from 'element-plus';

type MessageType = '' | 'success' | 'warning' | 'info' | 'error';

/**
 * 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 *
 * @param  api 操作数据接口的api方法 (必传)
 * @param  params 携带的操作数据参数 {id,params} (必传)
 * @param  message 提示信息 (必传)
 * @param  confirmType icon类型 (不必传,默认为 warning)
 * @returns Promise
 */
export function useConfirm(api: (params: any) => Promise<any>, params: any = {}, message: string, confirmType: MessageType = 'warning') {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`${$t('hooks.confirm.whether')}${message}？`, $t('common.kindTips'), {
      confirmButtonText: $t('common.sure'),
      cancelButtonText: $t('common.cancel'),
      type: confirmType,
      draggable: true,
    })
      .then(async () => {
        const res = await api(params);
        if (!res)
          return reject(new Error($t('common.operationFailed')));

        ElMessage({
          type: 'success',
          message: `${message}${$t('status.success')}!`,
        });
        resolve(true);
      });
  });
}
