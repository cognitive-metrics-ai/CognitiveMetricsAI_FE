<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header Banner -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 rounded-2xl shadow-lg border border-indigo-700/40">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">Cognitive Metrics AI — Performance Center</h1>
          <p class="text-indigo-200 text-sm mt-1">Real-time team focus index, cognitive workload balancing, and automated AI reviews.</p>
        </div>
        <div class="flex items-center gap-3">
          <router-link
            to="/performance/review-generator"
            class="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow transition duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            AI Review Generator
          </router-link>
        </div>
      </div>

      <!-- Top KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <!-- Average Focus Index -->
        <div class="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Focus Index</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ performanceStore.averageFocusIndex }}%</span>
              <span class="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full">+4.2%</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Deep work ratio</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
        </div>

        <!-- Average Cognitive Load -->
        <div class="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Cognitive Load</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ performanceStore.averageCognitiveLoad }}%</span>
              <span class="text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400 px-2 py-0.5 rounded-full">Optimal</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Task intensity level</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
            🧠
          </div>
        </div>

        <!-- High Burnout Risk -->
        <div class="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Burnout Alerts</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-extrabold text-rose-600 dark:text-rose-400">{{ performanceStore.highBurnoutCount }}</span>
              <span class="text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 px-2 py-0.5 rounded-full">Requires Action</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Active overload flags</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-lg">
            🔥
          </div>
        </div>

        <!-- Team Members Monitored -->
        <div class="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monitored Team</p>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-extrabold text-gray-900 dark:text-white">{{ performanceStore.employees.length }}</span>
              <span class="text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 px-2 py-0.5 rounded-full">Active</span>
            </div>
            <p class="text-xs text-gray-400 mt-1">Across 3 departments</p>
          </div>
          <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            👥
          </div>
        </div>
      </div>

      <!-- AI Insights & Risk Alerts Feed -->
      <div class="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-500/20 dark:border-amber-500/30 rounded-2xl p-5 shadow-sm">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-amber-500 text-lg">💡</span>
          <h2 class="text-base font-bold text-gray-900 dark:text-white">Active Cognitive AI Recommendations</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="insight in performanceStore.insights"
            :key="insight.id"
            class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200/80 dark:border-gray-700 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="font-semibold text-sm text-gray-900 dark:text-white">{{ insight.title }}</span>
                <span
                  :class="[
                    'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
                    insight.type === 'burnout_alert' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  ]"
                >
                  {{ insight.type.replace('_', ' ') }}
                </span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 mb-2">{{ insight.description }}</p>
            </div>
            <div class="pt-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
              <span class="text-indigo-600 dark:text-indigo-400 font-medium">Action: {{ insight.recommendedAction }}</span>
              <span class="text-gray-400">Confidence: {{ Math.round(insight.confidenceScore * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters & Team Performance Table/Cards -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-900 dark:text-white">Team Cognitive Metrics</h2>
            <p class="text-xs text-gray-500">Live breakdown of individual cognitive indicators and performance status.</p>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <!-- Search -->
            <input
              v-model="performanceStore.searchQuery"
              type="text"
              placeholder="Search team member..."
              class="text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none w-48"
            />
            <!-- Department Dropdown -->
            <select
              v-model="performanceStore.selectedDepartment"
              class="text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product & UX">Product & UX</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
            </select>
          </div>
        </div>

        <!-- Employee Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          <div
            v-for="employee in performanceStore.filteredEmployees"
            :key="employee.id"
            class="bg-gray-50 dark:bg-gray-900/60 rounded-2xl p-5 border border-gray-200/70 dark:border-gray-700/80 hover:shadow-md transition duration-200"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between gap-3 mb-4">
              <div class="flex items-center gap-3">
                <img :src="employee.avatarUrl" :alt="employee.name" class="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/30" />
                <div>
                  <h3 class="font-bold text-gray-900 dark:text-white text-base">{{ employee.name }}</h3>
                  <p class="text-xs text-gray-500">{{ employee.role }} • {{ employee.department }}</p>
                </div>
              </div>
              <span
                :class="[
                  'text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider',
                  employee.burnoutRiskLevel === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' :
                  employee.burnoutRiskLevel === 'moderate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                ]"
              >
                {{ employee.burnoutRiskLevel }} Risk
              </span>
            </div>

            <!-- Metric Progress Bars -->
            <div class="space-y-3 mb-5">
              <!-- Focus Index -->
              <div>
                <div class="flex justify-between text-xs font-medium mb-1">
                  <span class="text-gray-600 dark:text-gray-300">Focus Index (Deep Work)</span>
                  <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ employee.metrics.focusIndex }}%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div class="h-full bg-indigo-600 rounded-full" :style="{ width: employee.metrics.focusIndex + '%' }"></div>
                </div>
              </div>

              <!-- Problem Solving Velocity -->
              <div>
                <div class="flex justify-between text-xs font-medium mb-1">
                  <span class="text-gray-600 dark:text-gray-300">Problem Solving Velocity</span>
                  <span class="text-purple-600 dark:text-purple-400 font-bold">{{ employee.metrics.problemSolvingVelocity }}%</span>
                </div>
                <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div class="h-full bg-purple-600 rounded-full" :style="{ width: employee.metrics.problemSolvingVelocity + '%' }"></div>
                </div>
              </div>

              <!-- Cognitive Load -->
              <div>
                <div class="flex justify-between text-xs font-medium mb-1">
                  <span class="text-gray-600 dark:text-gray-300">Cognitive Load / Intensity</span>
                  <span
                    :class="[
                      'font-bold',
                      employee.metrics.cognitiveLoad > 85 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    ]"
                  >
                    {{ employee.metrics.cognitiveLoad }}%
                  </span>
                </div>
                <div class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    :class="[
                      'h-full rounded-full',
                      employee.metrics.cognitiveLoad > 85 ? 'bg-rose-500' : 'bg-emerald-500'
                    ]"
                    :style="{ width: employee.metrics.cognitiveLoad + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Action Link -->
            <div class="pt-3 border-t border-gray-200 dark:border-gray-700/80 flex items-center justify-between">
              <span class="text-xs text-gray-400">Joined {{ employee.joinDate }}</span>
              <router-link
                :to="'/performance/employees/' + employee.id"
                class="text-xs font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1"
              >
                View 360 Cognitive Breakdown →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { usePerformanceStore } from '../../stores/performanceStore'

const performanceStore = usePerformanceStore()
</script>
