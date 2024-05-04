<script setup lang="ts">
import avatar from '@/assets/images/avatars/8.jpg'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0" placement="bottom-end">
      <CDropdownHeader class="bg-body-secondary fw-semibold mb-2">Settings</CDropdownHeader>
      <CDropdownItem href="#">
        <CIcon icon="cilUser" class="me-2" />
        Profile
      </CDropdownItem>
      <CDropdownItem href="#">
        <CIcon icon="cilSettings" class="me-2" />
        Settings
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem href="/logout">
        <CIcon icon="cilAccountLogout" class="me-2" />{{ t('LOG_OUT') }}
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
