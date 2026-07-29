<template>
  <router-link to="/" class="lg:hidden">
    <img class="dark:hidden" src="/images/logo/logo_light.svg" alt="Logo" />
    <img class="hidden dark:block" src="/images/logo/logo_dark.svg" alt="Logo" />
  </router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
