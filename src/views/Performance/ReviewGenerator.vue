<template>
  <admin-layout>
    <div class="space-y-6 max-w-5xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">AI Cognitive Performance Review Generator</h1>
          <p class="text-xs text-gray-500 mt-1">Synthesize multi-dimensional cognitive metrics into objective performance reviews with LLM assistance.</p>
        </div>
        <router-link to="/performance" class="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3.5 py-2 rounded-xl hover:bg-gray-200">
          ← Back to Dashboard
        </router-link>
      </div>

      <!-- Generator Layout Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Configuration Form Panel -->
        <div class="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm space-y-4">
          <h2 class="text-base font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700">1. Review Parameters</h2>

          <!-- Target Employee Select -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Select Employee</label>
            <select
              v-model="selectedEmployeeId"
              class="w-full text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option v-for="emp in performanceStore.employees" :key="emp.id" :value="emp.id">
                {{ emp.name }} — {{ emp.role }}
              </option>
            </select>
          </div>

          <!-- Evaluation Period -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Evaluation Period</label>
            <select
              v-model="evaluationPeriod"
              class="w-full text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="H1 2026">H1 2026 (Jan - Jun)</option>
              <option value="Q2 2026">Q2 2026</option>
              <option value="Q3 2026">Q3 2026 (In Progress)</option>
              <option value="Annual 2026">Annual 2026</option>
            </select>
          </div>

          <!-- Manager Additional Context / Qualitative Notes -->
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Manager Observations & Notes (Optional)</label>
            <rich-text-editor
              v-model="managerNotes"
              placeholder="Add key milestones, project highlights, or qualitative context to guide the AI synthesis..."
              min-height="150px"
            />
          </div>

          <!-- Generate Action Button -->
          <button
            @click="handleGenerate"
            :disabled="isGenerating || !selectedEmployee"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-xs py-3 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg v-if="isGenerating" class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>{{ isGenerating ? 'AI Synthesizing Cognitive Data...' : '⚡ Generate AI Review Draft' }}</span>
          </button>
        </div>

        <!-- Generated Result Draft Panel -->
        <div class="lg:col-span-7 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 class="text-base font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-700 mb-4">
              2. Generated Review Synthesis
            </h2>

            <div v-if="generatedDraft" class="space-y-4">
              <!-- Score Badge & Status -->
              <div class="flex items-center justify-between bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50">
                <div>
                  <span class="text-xs text-indigo-500 font-semibold uppercase tracking-wider">Estimated Overall Rating</span>
                  <div class="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">
                    ★ {{ generatedDraft.overallRating }} / 5.0
                  </div>
                </div>
                <span class="text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full uppercase">
                  AI Draft Ready
                </span>
              </div>

              <!-- Cognitive Executive Summary -->
              <div>
                <h3 class="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">Cognitive Executive Summary</h3>
                <p class="text-xs text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200/60 dark:border-gray-700">
                  {{ generatedDraft.cognitiveSummary }}
                </p>
              </div>

              <!-- Key Strengths -->
              <div>
                <h3 class="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">Demonstrated Cognitive Strengths</h3>
                <ul class="space-y-1">
                  <li v-for="(s, i) in generatedDraft.strengths" :key="i" class="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span class="text-emerald-500 font-bold">✓</span> {{ s }}
                  </li>
                </ul>
              </div>

              <!-- Growth & Recovery Areas -->
              <div>
                <h3 class="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">Growth & Recovery Focus Areas</h3>
                <ul class="space-y-1">
                  <li v-for="(g, i) in generatedDraft.growthAreas" :key="i" class="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span class="text-purple-500 font-bold">➔</span> {{ g }}
                  </li>
                </ul>
              </div>

              <!-- AI Synthesis Insight -->
              <div class="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-200">
                <span class="font-bold block mb-1">💡 Manager Synthesis Guidance:</span>
                {{ generatedDraft.aiGeneratedInsights }}
              </div>

              <!-- Manager Notes Included Preview -->
              <div v-if="generatedDraft.managerNotes" class="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-xs">
                <span class="font-bold text-indigo-800 dark:text-indigo-300 block mb-1">📝 Manager Observations Included:</span>
                <div class="prose dark:prose-invert max-w-none text-xs text-gray-700 dark:text-gray-300 leading-relaxed" v-html="generatedDraft.managerNotes"></div>
              </div>
            </div>

            <!-- Empty Placeholder -->
            <div v-else class="py-16 text-center text-gray-400 text-xs space-y-2">
              <div class="text-3xl">✨</div>
              <p class="font-medium text-gray-600 dark:text-gray-300">No Review Draft Generated Yet</p>
              <p>Select an employee and click "Generate AI Review Draft" to build a data-backed performance evaluation.</p>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div v-if="generatedDraft" class="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-end gap-3 mt-4">
            <button
              @click="generatedDraft = null"
              class="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-3 py-2"
            >
              Discard
            </button>
            <button
              @click="handleSaveReview"
              class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition"
            >
              Save & Publish Performance Review
            </button>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import RichTextEditor from '../../components/forms/FormElements/RichTextEditor.vue'
import { usePerformanceStore } from '../../stores/performanceStore'
import { CognitiveAIService } from '../../services/cognitiveAiService'
import type { PerformanceReview } from '../../types/performance'

const route = useRoute()
const router = useRouter()
const performanceStore = usePerformanceStore()

const selectedEmployeeId = ref<string>('')
const evaluationPeriod = ref<string>('H1 2026')
const managerNotes = ref<string>('')
const isGenerating = ref<boolean>(false)
const generatedDraft = ref<Partial<PerformanceReview> | null>(null)

onMounted(() => {
  const paramEmp = route.query.employeeId as string
  if (paramEmp && performanceStore.employees.some(e => e.id === paramEmp)) {
    selectedEmployeeId.value = paramEmp
  } else if (performanceStore.employees.length) {
    selectedEmployeeId.value = performanceStore.employees[0].id
  }
})

const selectedEmployee = computed(() => {
  return performanceStore.getEmployeeById(selectedEmployeeId.value)
})

async function handleGenerate() {
  if (!selectedEmployee.value) return
  isGenerating.value = true
  try {
    generatedDraft.value = await CognitiveAIService.generatePerformanceEvaluation(
      selectedEmployee.value,
      evaluationPeriod.value,
      managerNotes.value
    )
  } finally {
    isGenerating.value = false
  }
}

function handleSaveReview() {
  if (!generatedDraft.value || !selectedEmployee.value) return
  const finalReview: PerformanceReview = {
    id: 'rev-' + Date.now(),
    employeeId: selectedEmployee.value.id,
    period: generatedDraft.value.period || evaluationPeriod.value,
    reviewDate: generatedDraft.value.reviewDate || new Date().toISOString().split('T')[0],
    overallRating: generatedDraft.value.overallRating || 4.5,
    cognitiveSummary: generatedDraft.value.cognitiveSummary || '',
    strengths: generatedDraft.value.strengths || [],
    growthAreas: generatedDraft.value.growthAreas || [],
    aiGeneratedInsights: generatedDraft.value.aiGeneratedInsights || '',
    managerNotes: managerNotes.value,
    status: 'approved'
  }
  performanceStore.addReview(finalReview)
  router.push('/performance/employees/' + selectedEmployee.value.id)
}
</script>
