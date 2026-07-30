<template>
  <router-link to="/" class="lg:hidden">
    <img class="dark:hidden h-10 w-auto" src="/images/logo/logo_light.png" alt="Logo" />
    <img class="hidden dark:block h-10 w-auto" src="/images/logo/logo_dark.png" alt="Logo" />
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
