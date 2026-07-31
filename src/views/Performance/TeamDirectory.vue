<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Team Directory</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">View and manage your team members</p>
        </div>
      </div>

      <!-- Employee Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="employee in store.employees"
          :key="employee.id"
          class="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
        >
          <div class="flex items-start gap-4 mb-4">
            <img :src="employee.avatarUrl" :alt="employee.name" referrerpolicy="no-referrer" class="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div>
              <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{{ employee.name }}</h3>
              <p class="text-sm font-medium text-indigo-600 dark:text-indigo-400">{{ employee.role }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ employee.department }}</p>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Focus Index</p>
              <p class="text-sm font-semibold" :class="getMetricColor(employee.metrics.focusIndex)">{{ employee.metrics.focusIndex }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Burnout Risk</p>
              <span :class="['px-2 py-0.5 text-xs font-semibold rounded', getRiskBadgeClass(employee.burnoutRiskLevel)]">
                {{ employee.burnoutRiskLevel.toUpperCase() }}
              </span>
            </div>
          </div>

          <div class="mt-auto pt-5 flex justify-end">
             <router-link
               :to="`/performance/employees/${employee.id}`"
               class="px-4 py-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
             >
               View Profile
             </router-link>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { usePerformanceStore } from '@/stores/performanceStore'
import AdminLayout from '@/components/layout/AdminLayout.vue'

const store = usePerformanceStore()

const getMetricColor = (val: number) => {
  if (val >= 80) return 'text-emerald-600 dark:text-emerald-400'
  if (val >= 70) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

const getRiskBadgeClass = (level: string) => {
  if (level === 'high') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  if (level === 'medium') return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
}
</script>
