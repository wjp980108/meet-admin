import { $t } from '@/utils';
import request from '@/utils/axios';

// 获取部门列表
export function deptList(params?: Department.Params) {
  return request<Department.Data[]>({
    url: '/api/department/list',
    method: 'get',
    params,
  });
}

// 新增部门
export function createDept(data: Department.Data) {
  return request({
    url: '/api/department/create',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: $t('common.saveLoading'),
  });
}

// 编辑部门
export function editDept(data: Department.Data) {
  return request({
    url: '/api/department/update',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: $t('common.saveLoading'),
  });
}

// 删除部门
export function deleteDept(id: string) {
  return request({
    url: '/api/department/delete',
    method: 'post',
    data: {
      id,
    },
  }, {
    loading: true,
    loadingText: $t('common.deleteLoading'),
  });
}

// 设置部门状态
export function upDeptStatus(data: { id: string, isEnabled: boolean }) {
  return request({
    url: '/api/department/updateEnabled',
    method: 'post',
    data,
  }, {
    loading: true,
    loadingText: $t('common.updateLoading'),
  });
}
