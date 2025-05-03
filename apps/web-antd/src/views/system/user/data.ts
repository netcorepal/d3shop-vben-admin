import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api';

import { $t } from '#/locales';

// 状态选项统一
const statusOptions = [
  { label: $t('common.enabled'), value: 1 },
  { label: $t('common.disabled'), value: 0 },
];

// 搜索表单 schema
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'userName',
      label: $t('system.user.userName'),
    },
    {
      component: 'Input',
      fieldName: 'nickName',
      label: $t('system.user.nickName'),
    },
    {
      component: 'Select',
      fieldName: 'status',
      label: $t('system.user.status'),
      componentProps: {
        allowClear: true,
        options: statusOptions,
      },
    },
  ];
}

// 编辑表单 schema
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'userName',
      label: $t('system.user.userName'),
      rules: 'required',
    },
    {
      component: 'InputPassword',
      fieldName: 'password',
      label: $t('system.user.password'),
      rules: 'required',
      ifShow: ({ values }: { values: Recordable }) => !values.id,
    },
    {
      component: 'Input',
      fieldName: 'nickName',
      label: $t('system.user.nickName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: $t('system.user.email'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: $t('system.user.phone'),
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: $t('system.user.status'),
      defaultValue: 1,
      componentProps: {
        options: statusOptions,
        optionType: 'button',
        buttonStyle: 'solid',
      },
    },
  ];
}

// 表格 columns
export function useColumns<T = SystemUserApi.SystemUser>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'userName',
      title: $t('system.user.userName'),
      width: 120,
    },
    {
      field: 'nickName',
      title: $t('system.user.nickName'),
      width: 120,
    },
    {
      field: 'email',
      title: $t('system.user.email'),
      width: 180,
    },
    {
      field: 'phone',
      title: $t('system.user.phone'),
      width: 120,
    },
    {
      cellRender: {
        name: 'CellTag',
      },
      field: 'status',
      title: $t('system.user.status'),
      width: 100,
    },
    {
      field: 'createTime',
      title: $t('system.user.createTime'),
      width: 180,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'userName',
          nameTitle: $t('system.user.userName'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.user.operation'),
      width: 130,
    },
  ];
}
