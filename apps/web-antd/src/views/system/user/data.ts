import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SystemUserApi } from '#/api/system/user';

import { $t } from '@vben/locales';

// 状态选项统一
const statusOptions = [
  { label: $t('common.enabled'), value: 1 },
  { label: $t('common.disabled'), value: 0 },
];

// 编辑表单 schema
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.user.userName'),
      rules: 'required',
    },
    {
      component: 'InputPassword',
      fieldName: 'password',
      label: $t('system.user.password'),
      rules: 'required',
      dependencies: {
        show: (values) => !values.id,
        triggerFields: ['id'],
      },
    },
    {
      component: 'Input',
      fieldName: 'realName',
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
      component: 'ApiSelect',
      fieldName: 'roleIds',
      label: $t('system.role.name'),
      componentProps: {
        // api: getAdminUserRoles,
        // params: (formModel) => ({ id: formModel.id }),
        resultField: 'items',
        labelField: 'name',
        valueField: 'id',
        mode: 'multiple',
        showSearch: true,
        optionFilterProp: 'label',
        placeholder: '请选择角色',
        class: 'w-full',
      },
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      fieldName: 'status',
      label: $t('system.user.status'),
      defaultValue: 1,
      componentProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    },
  ];
}

// 搜索表单 schema
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.user.userName'),
    },
    {
      component: 'Input',
      fieldName: 'realName',
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

// 表格 columns
export function useColumns<T = SystemUserApi.SystemUser>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      title: $t('system.user.name'),
      width: 200,
    },
    {
      field: 'realName',
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
      field: 'roleIds',
      title: $t('system.role.name'),
      width: 200,
      cellRender: {
        name: 'CellTag',
        props: {
          multiple: true,
        },
      },
    },
    {
      field: 'createdAt',
      title: $t('system.role.createTime'),
      minWidth: 100,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'name',
          nameTitle: $t('system.role.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
    },
  ];
}
