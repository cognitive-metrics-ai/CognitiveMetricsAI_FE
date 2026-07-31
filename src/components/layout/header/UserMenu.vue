<template>
  <div class="relative" ref="dropdownRef">
    <!-- User Profile Dropdown (when signed in) -->
    <template v-if="isAuthenticated">
      <button
        class="flex items-center text-gray-700 dark:text-gray-400 focus:outline-none"
        @click.prevent="toggleDropdown"
      >
        <span class="mr-3 overflow-hidden rounded-full h-10 w-10 border border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0">
          <img
            :src="userPhotoURL"
            alt="User"
            class="w-full h-full object-cover"
            referrerpolicy="no-referrer"
            @error="(e) => { const el = e.target as HTMLImageElement; if (el) el.src = '/images/user/user-icon.svg'; }"
          />
        </span>

        <span class="hidden sm:block mr-1 font-medium text-theme-sm text-gray-800 dark:text-white/90">{{ displayName }}</span>

        <ChevronDownIcon class="transition-transform duration-200" :class="{ 'rotate-180': dropdownOpen }" />
      </button>

      <!-- Dropdown Start -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
      >
        <div class="px-2 py-1 border-b border-gray-200 dark:border-gray-800 pb-3">
          <span class="block font-semibold text-gray-800 text-theme-sm dark:text-white">
            {{ displayName }}
          </span>
          <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400 truncate">
            {{ email }}
          </span>
        </div>

        <ul class="flex flex-col gap-1 pt-3 pb-2 border-b border-gray-200 dark:border-gray-800">
          <li v-for="item in menuItems" :key="item.href">
            <router-link
              :to="item.href"
              @click="closeDropdown"
              class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
            >
              <component
                :is="item.icon"
                class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 w-5 h-5"
              />
              {{ item.text }}
            </router-link>
          </li>
        </ul>

        <button
          @click="handleSignOut"
          class="flex items-center gap-3 px-3 py-2 mt-2 font-medium text-red-600 rounded-lg group text-theme-sm hover:bg-red-50 dark:hover:bg-red-500/10 transition w-full text-left"
        >
          <LogoutIcon class="w-5 h-5 text-red-500" />
          Sign out
        </button>
      </div>
      <!-- Dropdown End -->
    </template>

    <!-- Sign In Button (when not signed in) -->
    <template v-else>
      <router-link
        to="/signin"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        <UserCircleIcon class="w-5 h-5" />
        Sign In
      </router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { UserCircleIcon, ChevronDownIcon, LogoutIcon, SettingsIcon, InfoCircleIcon } from '@/icons'
import { auth, signOut } from '@/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import { extractPhotoURL } from '@/services/userService'

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)
const isAuthenticated = ref(false)
const displayName = ref('')
const email = ref('')
const userPhotoURL = ref('/images/user/user-icon.svg')

const router = useRouter()

const menuItems = [
  { href: '/profile', icon: UserCircleIcon, text: 'Edit profile' },
  { href: '/profile', icon: SettingsIcon, text: 'Account settings' },
  { href: '/profile', icon: InfoCircleIcon, text: 'Support' },
]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleSignOut = async () => {
  try {
    await signOut(auth)
    closeDropdown()
    router.push('/signin')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      isAuthenticated.value = true
      displayName.value = user.displayName || user.email?.split('@')[0] || 'User'
      email.value = user.email || ''
      const photo = extractPhotoURL(user)
      userPhotoURL.value = photo || '/images/user/user-icon.svg'
    } else {
      isAuthenticated.value = false
      displayName.value = ''
      email.value = ''
      userPhotoURL.value = '/images/user/user-icon.svg'
    }
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
