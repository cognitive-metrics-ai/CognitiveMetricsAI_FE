<template>
  <admin-layout>
    <div v-if="employee" class="space-y-6">
      <!-- Breadcrumb Nav -->
      <div class="flex items-center gap-2 text-xs text-gray-500">
        <router-link to="/performance" class="hover:text-indigo-600">Performance Center</router-link>
        <span>/</span>
        <span class="text-gray-900 dark:text-white font-medium">{{ employee.name }}</span>
      </div>

      <!-- Employee Header Profile Card -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="flex items-center gap-5">
          <img :src="employee.avatarUrl" :alt="employee.name" class="w-20 h-20 rounded-2xl object-cover border-4 border-indigo-500/20 shadow-md" />
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ employee.name }}</h1>
              <span
                :class="[
                  'text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider',
                  employee.burnoutRiskLevel === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400' :
                  employee.burnoutRiskLevel === 'moderate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400' :
                  'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                ]"
              >
                {{ employee.burnoutRiskLevel }} Burnout Risk
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{ employee.role }} • {{ employee.department }}</p>
            <p class="text-xs text-gray-400 mt-1">Email: {{ employee.email }} | Joined: {{ employee.joinDate }}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            :to="'/performance/review-generator?employeeId=' + employee.id"
            class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow transition duration-200"
          >
            Generate AI Performance Review
          </router-link>
        </div>
      </div>

      <!-- Cognitive Profile Grid: Radar Chart + Trend Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- 5-Dimensional Cognitive Radar -->
        <div class="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 class="text-base font-bold text-gray-900 dark:text-white mb-1">5-Dimensional Cognitive Profile</h2>
            <p class="text-xs text-gray-500 mb-4">Multi-axis evaluation of focus, velocity, adaptability, collaboration, and load.</p>
          </div>

          <div class="h-72">
            <apexchart
              type="radar"
              height="100%"
              :options="radarOptions"
              :series="radarSeries"
            />
          </div>

          <div class="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs">
            <div>
              <span class="text-gray-400 block">Focus Index</span>
              <span class="font-bold text-gray-900 dark:text-white text-sm">{{ employee.metrics.focusIndex }}/100</span>
            </div>
            <div>
              <span class="text-gray-400 block">Velocity</span>
              <span class="font-bold text-gray-900 dark:text-white text-sm">{{ employee.metrics.problemSolvingVelocity }}/100</span>
            </div>
            <div>
              <span class="text-gray-400 block">Adaptability</span>
              <span class="font-bold text-gray-900 dark:text-white text-sm">{{ employee.metrics.adaptabilityScore }}/100</span>
            </div>
            <div>
              <span class="text-gray-400 block">Collaboration</span>
              <span class="font-bold text-gray-900 dark:text-white text-sm">{{ employee.metrics.collaborationEfficiency }}/100</span>
            </div>
          </div>
        </div>

        <!-- Historical Trend Line Chart -->
        <div class="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="text-base font-bold text-gray-900 dark:text-white">6-Month Cognitive Trend</h2>
              <p class="text-xs text-gray-500">Tracking focus index vs cognitive load progression over time.</p>
            </div>
          </div>

          <div class="h-72">
            <apexchart
              type="line"
              height="100%"
              :options="trendOptions"
              :series="trendSeries"
            />
          </div>
        </div>
      </div>

      <!-- AI Coaching Tips & AI Reviews History -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- AI Coaching Tips -->
        <div class="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-purple-950 text-white rounded-2xl p-6 shadow-md border border-indigo-700/50">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">🤖</span>
            <h2 class="text-base font-bold">AI Manager Coaching Tips</h2>
          </div>
          <p class="text-xs text-indigo-200 mb-4">Automated managerial guidance tailored to {{ employee.name }}'s current cognitive load profile.</p>

          <ul class="space-y-3">
            <li
              v-for="(tip, index) in coachingTips"
              :key="index"
              class="flex items-start gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 text-xs text-indigo-100"
            >
              <span class="text-indigo-400 font-bold text-sm">0{{ index + 1 }}</span>
              <span>{{ tip }}</span>
            </li>
          </ul>
        </div>

        <!-- Review History -->
        <div class="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 class="text-base font-bold text-gray-900 dark:text-white mb-4">Performance Review Record</h2>

          <div v-if="employeeReviews.length" class="space-y-4">
            <div
              v-for="rev in employeeReviews"
              :key="rev.id"
              class="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-700"
            >
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-sm text-gray-900 dark:text-white">{{ rev.period }} Evaluation</span>
                  <span class="text-xs bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold px-2 py-0.5 rounded-full">
                    ★ {{ rev.overallRating }} / 5.0
                  </span>
                </div>
                <span class="text-xs text-gray-400">{{ rev.reviewDate }}</span>
              </div>
              <p class="text-xs text-gray-600 dark:text-gray-300 mb-2">{{ rev.cognitiveSummary }}</p>
              <div class="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                AI Synthesis: {{ rev.aiGeneratedInsights }}
              </div>
              <div v-if="rev.managerNotes" class="p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-xs">
                <span class="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Manager Observations & Notes:</span>
                <div class="prose dark:prose-invert max-w-none text-xs text-gray-600 dark:text-gray-300 leading-relaxed" v-html="rev.managerNotes"></div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-400 text-xs">
            No formal reviews logged yet for this period. Click above to generate an AI review.
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback if employee not found -->
    <div v-else class="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
      <h2 class="text-lg font-bold text-gray-800 dark:text-white">Employee Profile Not Found</h2>
      <p class="text-xs text-gray-500 mt-1 mb-4">The requested employee ID does not exist in the store.</p>
      <router-link to="/performance" class="text-xs bg-indigo-600 text-white px-4 py-2 rounded-xl">Back to Performance Center</router-link>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { usePerformanceStore } from '../../stores/performanceStore'
import { CognitiveAIService } from '../../services/cognitiveAiService'

const route = useRoute()
const performanceStore = usePerformanceStore()

onMounted(() => {
  performanceStore.fetchBackendData()
})

const employeeId = computed(() => route.params.id as string)
const employee = computed(() => performanceStore.getEmployeeById(employeeId.value))

const employeeReviews = computed(() => {
  return performanceStore.reviews.filter(r => r.employeeId === employeeId.value)
})

const coachingTips = computed(() => {
  return employee.value ? CognitiveAIService.generateCoachingTips(employee.value) : []
})

// ApexCharts Radar Options & Series
const radarSeries = computed(() => {
  if (!employee.value) return []
  return [
    {
      name: 'Cognitive Score',
      data: [
        employee.value.metrics.focusIndex,
        employee.value.metrics.problemSolvingVelocity,
        employee.value.metrics.cognitiveLoad,
        employee.value.metrics.adaptabilityScore,
        employee.value.metrics.collaborationEfficiency
      ]
    }
  ]
})

const radarOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    background: 'transparent'
  },
  xaxis: {
    categories: ['Focus Index', 'Velocity', 'Cognitive Load', 'Adaptability', 'Collaboration']
  },
  colors: ['#6366f1'],
  stroke: { width: 2 },
  fill: { opacity: 0.3 }
}))

// ApexCharts Trend Options & Series
const trendSeries = computed(() => {
  if (!employee.value) return []
  return [
    {
      name: 'Focus Index',
      data: employee.value.historicalTrends.map(t => t.focusIndex)
    },
    {
      name: 'Cognitive Load',
      data: employee.value.historicalTrends.map(t => t.cognitiveLoad)
    },
    {
      name: 'Problem Solving Velocity',
      data: employee.value.historicalTrends.map(t => t.velocity)
    }
  ]
})

const trendOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    background: 'transparent'
  },
  xaxis: {
    categories: employee.value?.historicalTrends.map(t => t.date) || []
  },
  colors: ['#6366f1', '#f43f5e', '#a855f7'],
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 4 }
}))
</script>
