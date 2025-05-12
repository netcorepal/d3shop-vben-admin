<script lang="ts" setup>
import type { SystemUserApi } from '#/api/system/user';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { getRoleList } from '#/api/system/role';
import { createUser, getAdminUserRoles, updateUser } from '#/api/system/user';

import { useFormSchema } from '../data';

const emits = defineEmits(['success']);

const formData = ref<SystemUserApi.SystemUser>();
const id = ref();
const roles = ref<{ label: string; value: string }[]>([]);

// Load roles when component is mounted
const loadRoles = async () => {
  const res = await getRoleList({ pageIndex: 1, pageSize: 1000 });
  roles.value = res.items.map((role) => ({
    label: role.name,
    value: role.id,
  }));
  // 更新表单中 roleIds 字段的 options
  formApi.updateSchema([
    {
      fieldName: 'roleIds',
      componentProps: {
        options: roles.value,
      },
    },
  ]);
};

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues<SystemUserApi.SystemUser>();
    drawerApi.lock();
    try {
      await (id.value ? updateUser(values) : createUser(values));
      emits('success');
      drawerApi.close();
    } catch {
      drawerApi.unlock();
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<SystemUserApi.SystemUser>();
      formApi.resetForm();
      if (data) {
        formData.value = data;
        id.value = data.id;
        // 先加载角色列表，然后再设置表单值
        (async () => {
          await loadRoles();
          if (data.id) {
            const userRoles = await getAdminUserRoles(data.id);
            data.roleIds = userRoles
              .filter((role) => role.isAssigned)
              .map((role) => role.roleId?.toString() || '');
            formApi.setValues(data);
          }
        })();
      } else {
        formData.value = { status: 1 } as SystemUserApi.SystemUser;
        id.value = undefined;
        loadRoles();
      }
    }
  },
});

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', $t('system.user.name'))
    : $t('common.create', $t('system.user.name'));
});

defineExpose({
  submit: () => drawerApi.onConfirm(),
  setFieldsValue: formApi.setValues,
});
</script>

<template>
  <Drawer :title="getDrawerTitle">
    <Form />
  </Drawer>
</template>

<style scoped>
.ant-form {
  padding: 24px;
}
</style>
