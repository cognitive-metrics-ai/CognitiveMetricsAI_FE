<template>
  <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
    <!-- Header & Controls -->
    <div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-gray-800">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">Performance Reviews & Calibration Table</h3>
          <span class="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
            <span class="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
            Core-HR Synced
          </span>
        </div>
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Review Cycle, Goals, Competency Ratings, Self Reviews, Manager Reviews, and Final Calibration Scores.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search cycle, employee, goals..."
            class="w-full sm:w-64 rounded-xl border border-gray-300 bg-transparent px-4 py-2 pl-9 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
          <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Performance Table -->
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-white/[0.02]">
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Review Cycle
            </th>
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Employee
            </th>
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Goals
            </th>
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Competency Ratings
            </th>
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Self Review
            </th>
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Manager Review
            </th>
            <th class="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Calibration Score
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
          <tr
            v-for="rev in filteredReviews"
            :key="rev.id"
            class="hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors"
          >
            <!-- Review Cycle -->
            <td class="px-5 py-4 whitespace-nowrap">
              <span class="inline-flex items-center rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                {{ rev.review_cycle || 'Q2 2026' }}
              </span>
            </td>

            <!-- Employee Info -->
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {{ getInitials(rev.employee_name) }}
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900 dark:text-white">
                    {{ rev.employee_name }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {{ rev.employee_code }} • {{ rev.department }}
                  </div>
                </div>
              </div>
            </td>

            <!-- Goals -->
            <td class="px-5 py-4 max-w-xs">
              <div v-if="rev.goals && rev.goals.length > 0" class="space-y-1.5">
                <div
                  v-for="(g, idx) in rev.goals"
                  :key="idx"
                  class="flex items-center justify-between text-xs p-1.5 rounded-lg bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800"
                >
                  <span class="truncate font-medium text-gray-700 dark:text-gray-300 pr-2" :title="g.title">
                    {{ g.title }}
                  </span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                    {{ g.achieved }}%
                  </span>
                </div>
              </div>
              <span v-else class="text-xs text-gray-400">Standard OKRs</span>
            </td>

            <!-- Competency Ratings -->
            <td class="px-5 py-4">
              <div v-if="rev.competency_ratings" class="flex flex-wrap gap-1.5 max-w-xs">
                <span
                  v-for="(val, key) in rev.competency_ratings"
                  :key="key"
                  class="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  <span class="font-medium">{{ key }}:</span>
                  <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ val }}</span>
                </span>
              </div>
              <span v-else class="text-xs text-gray-400">—</span>
            </td>

            <!-- Self Review -->
            <td class="px-5 py-4 max-w-xs">
              <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 italic">
                "{{ rev.self_review || 'Completed self evaluation.' }}"
              </p>
            </td>

            <!-- Manager Review -->
            <td class="px-5 py-4 max-w-xs">
              <p class="text-xs text-gray-800 dark:text-gray-200 line-clamp-2">
                {{ rev.manager_review || rev.feedback || 'Manager evaluation logged.' }}
              </p>
            </td>

            <!-- Calibration Scores -->
            <td class="px-5 py-4 whitespace-nowrap">
              <div class="flex items-center gap-1">
                <span class="text-yellow-400 text-sm">★</span>
                <span class="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                  {{ (rev.calibration_scores || rev.overall_rating || 4.5).toFixed(1) }}
                </span>
                <span class="text-xs text-gray-400">/ 5.0</span>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="filteredReviews.length === 0">
            <td colspan="7" class="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No performance reviews found matching "{{ searchQuery }}".
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Footer Stats -->
    <div class="flex items-center justify-between border-t border-gray-100 p-4 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
      <span>Showing {{ filteredReviews.length }} of {{ reviews.length }} performance records</span>
      <span>Neon PostgreSQL Core-HR Calibration</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

export interface GoalItem {
  title: string
  target: number
  achieved: number
  status?: string
}

export interface ReviewRecord {
  id: string
  employee_id: string
  employee_name: string
  employee_code: string
  department: string
  review_cycle: string
  goals: GoalItem[]
  competency_ratings: Record<string, number>
  manager_review: string
  self_review: string
  calibration_scores: number
  overall_rating?: number
  feedback?: string
}

const searchQuery = ref('')

const reviews = ref<ReviewRecord[]>([
  {
    id: '1',
    employee_id: 'sarah-1',
    employee_name: 'Sarah Jenkins',
    employee_code: 'EMP-1001',
    department: 'Design',
    review_cycle: 'Q2 2026',
    goals: [
      { title: 'Redesign Core Analytics Dashboard', target: 100, achieved: 98 },
      { title: 'Establish UI Micro-Animations System', target: 100, achieved: 95 },
    ],
    competency_ratings: {
      'Technical Execution': 4.8,
      'Leadership': 4.6,
      'Collaboration': 4.9,
    },
    manager_review: 'Sarah has consistently delivered world-class UI design architectures with exceptional brand harmony.',
    self_review: 'Successfully led the redesign of the enterprise telemetry dashboard.',
    calibration_scores: 4.8,
  },
  {
    id: '2',
    employee_id: 'marcus-1',
    employee_name: 'Marcus Vance',
    employee_code: 'EMP-1002',
    department: 'Engineering',
    review_cycle: 'Q2 2026',
    goals: [
      { title: 'Real-Time Metrics Telemetry API', target: 100, achieved: 92 },
      { title: 'PostgreSQL Query Optimization', target: 100, achieved: 90 },
    ],
    competency_ratings: {
      'Technical Execution': 4.9,
      'Leadership': 4.5,
      'Collaboration': 4.4,
    },
    manager_review: 'Marcus demonstrated stellar fullstack technical mastery with robust query optimizations.',
    self_review: 'Maintained high velocity on serverless telemetry pipelines while upgrading backend concurrency.',
    calibration_scores: 4.6,
  },
  {
    id: '3',
    employee_id: 'elena-1',
    employee_name: 'Elena Rostova',
    employee_code: 'EMP-1003',
    department: 'AI & Analytics',
    review_cycle: 'Q2 2026',
    goals: [
      { title: 'Cognitive Load Fatigue AI Model', target: 100, achieved: 96 },
      { title: 'Predictive Burnout Analytics', target: 100, achieved: 94 },
    ],
    competency_ratings: {
      'Technical Execution': 4.9,
      'Leadership': 4.7,
      'Collaboration': 4.6,
    },
    manager_review: 'Elena continues to lead pioneering work in cognitive data modeling with analytical precision.',
    self_review: 'Developed 5-dimensional cognitive profile synthesis algorithms.',
    calibration_scores: 4.85,
  },
])

const fetchReviewsFromNeon = async () => {
  try {
    const [revRes, userRes] = await Promise.all([
      fetch('http://localhost:8000/api/v1/reviews/').catch(() => null),
      fetch('http://localhost:8000/api/v1/users/').catch(() => null),
    ])

    if (revRes?.ok && userRes?.ok) {
      const revData = await revRes.json()
      const userData = await userRes.json()

      if (Array.isArray(revData) && revData.length > 0 && Array.isArray(userData)) {
        const userMap = new Map<string, any>()
        for (const u of userData) {
          userMap.set(u.id, u)
          if (u.employee_id) userMap.set(u.employee_id, u)
        }

        const loaded: ReviewRecord[] = []
        for (const item of revData) {
          const u = userMap.get(item.employee_id) || {}
          loaded.push({
            id: item.id,
            employee_id: item.employee_id,
            employee_name: u.full_name || `${u.first_name || ''} ${u.last_name || ''}`.trim() || 'Employee',
            employee_code: u.employee_id || 'EMP-1000',
            department: u.department || 'General',
            review_cycle: item.review_cycle || item.period || 'Q2 2026',
            goals: Array.isArray(item.goals) ? item.goals : [],
            competency_ratings: item.competency_ratings || {},
            manager_review: item.manager_review || item.feedback || '',
            self_review: item.self_review || '',
            calibration_scores: item.calibration_scores || item.overall_rating || 4.5,
          })
        }
        if (loaded.length > 0) {
          reviews.value = loaded
        }
      }
    }
  } catch (err) {
    console.warn('Neon DB reviews sync notice:', err)
  }
}

onMounted(() => {
  fetchReviewsFromNeon()
})

const getInitials = (name: string): string => {
  if (!name) return 'EP'
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const filteredReviews = computed(() => {
  if (!searchQuery.value.trim()) return reviews.value
  const q = searchQuery.value.toLowerCase().trim()
  return reviews.value.filter(
    (r) =>
      r.review_cycle.toLowerCase().includes(q) ||
      r.employee_name.toLowerCase().includes(q) ||
      r.employee_code.toLowerCase().includes(q) ||
      r.manager_review.toLowerCase().includes(q) ||
      r.self_review.toLowerCase().includes(q)
  )
})
</script>
