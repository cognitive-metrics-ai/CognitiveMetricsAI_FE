<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Performance Goals</h1>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage and track your employee review goals</p>
        </div>
        <button
          @click="showAddModal = true"
          class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-md transition-colors flex items-center gap-2"
        >
          <span class="text-lg">+</span> Add Goal
        </button>
      </div>

      <!-- Goals Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="goals.length > 0">
        <div
          v-for="goal in goals"
          :key="goal.id"
          class="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div class="flex justify-between items-start mb-3">
              <span
                :class="[
                  'px-2.5 py-0.5 text-xs font-semibold rounded-full',
                  goal.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  goal.status === 'In Progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                ]"
              >
                {{ goal.status }}
              </span>
              <span class="text-xs text-gray-400">{{ goal.targetDate }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ goal.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ goal.description }}
            </p>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
             <button
                v-if="goal.status !== 'Completed'"
                @click="markCompleted(goal.id)"
                class="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 transition-colors"
             >
               Mark Complete
             </button>
             <button
                @click="deleteGoal(goal.id)"
                class="text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
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
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Date</label>
              <input
                v-model="newGoal.targetDate"
                type="date"
                required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
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
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'

interface Goal {
  id: number
  title: string
  description: string
  targetDate: string
  status: 'Not Started' | 'In Progress' | 'Completed'
}

// Initial mock state
const goals = ref<Goal[]>([
  {
    id: 1,
    title: 'Complete Q3 Reviews',
    description: 'Use the AI Review Generator to finalize Q3 performance reviews for the UX design team.',
    targetDate: '2026-08-15',
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'Assess Engineering Focus Index',
    description: 'Review the cognitive workload and focus index metrics for the frontend engineering division.',
    targetDate: '2026-08-20',
    status: 'Not Started'
  }
])

const showAddModal = ref(false)

const newGoal = ref({
  title: '',
  description: '',
  targetDate: ''
})

const closeModal = () => {
  showAddModal.value = false
  newGoal.value = {
    title: '',
    description: '',
    targetDate: ''
  }
}

const submitGoal = () => {
  const goal: Goal = {
    id: Date.now(),
    title: newGoal.value.title,
    description: newGoal.value.description,
    targetDate: newGoal.value.targetDate,
    status: 'Not Started'
  }
  
  goals.value.unshift(goal)
  closeModal()
}

const deleteGoal = (id: number) => {
  goals.value = goals.value.filter(g => g.id !== id)
}

const markCompleted = (id: number) => {
  const goal = goals.value.find(g => g.id === id)
  if (goal) {
    goal.status = 'Completed'
  }
}
</script>
