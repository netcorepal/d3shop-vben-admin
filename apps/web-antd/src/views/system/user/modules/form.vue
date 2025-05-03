<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { SystemUserApi } from '#/api/system/user';

import { computed, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { createUser, updateUser } from '#/api/system/user';

const emits = defineEmits(['success']);

const formData = ref<SystemUserApi.SystemUser>();
const id = ref();

const schema: VbenFormSchema[] = [
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
    dependencies: {
      show: (values) => !values.id,
      triggerFields: ['id'],
    },
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
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
];

const [Form, formApi] = useVbenForm({
  schema,
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
        formApi.setValues(data);
      } else {
        formData.value = { status: 1 } as SystemUserApi.SystemUser;
        id.value = undefined;
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
  submit: () => drawerApi.confirm(),
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
