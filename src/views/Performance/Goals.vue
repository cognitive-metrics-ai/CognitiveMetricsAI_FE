<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Performance Goals</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your employee review goals</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 items-center">
          <select
            v-model="filterTerm"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="All">All Quarters</option>
            <option value="Q1 2026">Q1 2026</option>
            <option value="Q2 2026">Q2 2026</option>
            <option value="Q3 2026">Q3 2026</option>
            <option value="Q4 2026">Q4 2026</option>
            <option value="Q1 2027">Q1 2027</option>
            <option value="Q2 2027">Q2 2027</option>
            <option value="Q3 2027">Q3 2027</option>
            <option value="Q4 2027">Q4 2027</option>
          </select>

          <select
            v-model="filterStatus"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Not Active">Not Active</option>
          </select>

          <button
            @click="showAddModal = true"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            <span class="text-lg">+</span> Add Goal
          </button>
        </div>
      </div>

      <!-- Goals List -->
      <div class="flex flex-col gap-4" v-if="filteredGoals.length > 0">
        <div
          v-for="goal in filteredGoals"
          :key="goal.id"
          class="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md"
        >
          <div class="flex-1">
            <div class="flex flex-wrap items-center gap-3 mb-2">
              <span
                :class="[
                  'px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full',
                  goal.isActive ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                ]"
              >
                {{ goal.isActive ? 'Active Goal' : 'Not Active Goal' }}
              </span>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                🗓️ {{ goal.term }}
              </span>
              
              <div class="flex gap-2" v-if="goal.division || goal.jobRole">
                <span v-if="goal.division" class="px-2 py-0.5 text-[10px] font-semibold bg-gray-50 border border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 rounded">{{ goal.division }}</span>
                <span v-if="goal.jobRole" class="px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-400 rounded">{{ goal.jobRole }}</span>
              </div>
            </div>
            
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ goal.title }}</h3>
            
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ goal.description }}
            </p>
          </div>
          
          <div class="flex md:flex-col justify-end items-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-700 pt-4 md:pt-0 md:pl-5 mt-4 md:mt-0">
             <button
                @click="toggleActive(goal.id)"
                :class="['px-4 py-2 text-xs font-semibold rounded-lg transition-colors w-full md:w-32 text-center', goal.isActive ? 'bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/40' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40']"
             >
               {{ goal.isActive ? 'Not Active' : 'Active' }}
             </button>
             <button
                @click="deleteGoal(goal.id)"
                class="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-lg transition-colors w-full md:w-32 text-center"
             >
               Delete
             </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <div class="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          🎯
        </div>
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">No goals defined yet</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6">Create your first goal to start tracking employee review progress.</p>
        <button
          @click="showAddModal = true"
          class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow transition-colors inline-flex items-center gap-2"
        >
          Add Your First Goal
        </button>
      </div>

      <!-- Add Goal Modal -->
      <div v-if="showAddModal" class="fixed inset-0 z-[999] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
        <div class="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Add New Goal</h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              ✕
            </button>
          </div>
          
          <form @submit.prevent="submitGoal" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Title</label>
              <input
                v-model="newGoal.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. Complete Q3 Reviews for Engineering"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                v-model="newGoal.description"
                rows="3"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                placeholder="Details about what needs to be reviewed..."
              ></textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Division</label>
                <select
                  v-model="newGoal.division"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="" disabled>Select division</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product & UX">Product & UX</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Role</label>
                <select
                  v-model="newGoal.jobRole"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="" disabled>Select role</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="UX Designer">UX Designer</option>
                  <option value="Product Manager">Product Manager</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Goal Term</label>
              <select
                v-model="newGoal.term"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="" disabled>Select quarter</option>
                <option value="Q1 2026">Q1 2026</option>
                <option value="Q2 2026">Q2 2026</option>
                <option value="Q3 2026">Q3 2026</option>
                <option value="Q4 2026">Q4 2026</option>
                <option value="Q1 2027">Q1 2027</option>
                <option value="Q2 2027">Q2 2027</option>
                <option value="Q3 2027">Q3 2027</option>
                <option value="Q4 2027">Q4 2027</option>
              </select>
            </div>

            <div class="pt-4 flex gap-3 justify-end">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'

interface Goal {
  id: number
  title: string
  description: string
  term: string
  isActive: boolean
  division?: string
  jobRole?: string
}

// Initial mock state
const goals = ref<Goal[]>([
  {
    id: 1,
    title: 'Complete Q3 Reviews',
    description: 'Use the AI Review Generator to finalize Q3 performance reviews for the UX design team.',
    term: 'Q3 2026',
    isActive: true,
    division: 'Product & UX',
    jobRole: 'UX Designer'
  },
  {
    id: 2,
    title: 'Assess Engineering Focus Index',
    description: 'Review the cognitive workload and focus index metrics for the frontend engineering division.',
    term: 'Q3 2026',
    isActive: false,
    division: 'Engineering',
    jobRole: 'Frontend Developer'
  }
])

const getCurrentQuarter = () => {
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  const quarter = Math.floor(month / 3) + 1
  return `Q${quarter} ${year}`
}

const filterTerm = ref(getCurrentQuarter())
const filterStatus = ref('Active')

const filteredGoals = computed(() => {
  return goals.value.filter(goal => {
    const matchTerm = filterTerm.value === 'All' || goal.term === filterTerm.value
    let matchStatus = true
    if (filterStatus.value === 'Active') {
      matchStatus = goal.isActive === true
    } else if (filterStatus.value === 'Not Active') {
      matchStatus = goal.isActive === false
    }
    return matchTerm && matchStatus
  })
})

const showAddModal = ref(false)

const newGoal = ref({
  title: '',
  description: '',
  term: '',
  division: '',
  jobRole: ''
})

const closeModal = () => {
  showAddModal.value = false
  newGoal.value = {
    title: '',
    description: '',
    term: '',
    division: '',
    jobRole: ''
  }
}

const submitGoal = () => {
  const goal: Goal = {
    id: Date.now(),
    title: newGoal.value.title,
    description: newGoal.value.description,
    term: newGoal.value.term,
    isActive: true,
    division: newGoal.value.division,
    jobRole: newGoal.value.jobRole
  }
  
  goals.value.unshift(goal)
  closeModal()
}

const deleteGoal = (id: number) => {
  goals.value = goals.value.filter(g => g.id !== id)
}

const toggleActive = (id: number) => {
  const goal = goals.value.find(g => g.id === id)
  if (goal) {
    goal.isActive = !goal.isActive
  }
}
</script>
