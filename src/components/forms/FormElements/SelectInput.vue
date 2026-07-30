<template>
  <div class="space-y-6">
    <!-- Live Department Select Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Department (Synced with Neon DB)
      </label>
      <div class="relative z-20 bg-transparent">
        <select
          v-model="selectedDepartment"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        >
          <option value="" disabled>Select Department</option>
          <option
            v-for="dept in departments"
            :key="dept.id"
            :value="dept.name"
            class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {{ dept.name }} ({{ dept.department_id }})
          </option>
        </select>
        <span class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
          <svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>

    <!-- Live Job Title Select Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Job Title Profile (Synced with Jobs & Competencies Table in Neon DB)
      </label>
      <div class="relative z-20 bg-transparent">
        <select
          v-model="selectedJobTitle"
          class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        >
          <option value="" disabled>Select Job Profile</option>
          <option
            v-for="job in jobs"
            :key="job.id"
            :value="job.job_title"
            class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            [{{ job.job_id }}] {{ job.job_title }} — {{ job.job_family }} ({{ job.job_level }})
          </option>
        </select>
        <span class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
          <svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>
    </div>

    <!-- Multiple Select Input -->
    <div>
      <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        Multi-Select
      </label>
      <MultipleSelect v-model="selectedItems" :options="optionss" class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MultipleSelect from './MultipleSelect.vue'

interface DeptItem {
  id: string
  department_id: string
  name: string
}

interface JobProfileItem {
  id: string
  job_id: string
  job_title: string
  job_family?: string
  job_level?: string
}

const selectedDepartment = ref('')
const selectedJobTitle = ref('')
const departments = ref<DeptItem[]>([
  { id: '1', department_id: 'DEPT-101', name: 'Engineering' },
  { id: '2', department_id: 'DEPT-102', name: 'Design' },
  { id: '3', department_id: 'DEPT-103', name: 'AI & Analytics' },
  { id: '4', department_id: 'DEPT-104', name: 'Infrastructure' },
  { id: '5', department_id: 'DEPT-105', name: 'Product' },
])

const jobs = ref<JobProfileItem[]>([
  { id: '1', job_id: 'JOB-101', job_title: 'Senior Design Engineer', job_family: 'Design', job_level: 'L5 Senior' },
  { id: '2', job_id: 'JOB-102', job_title: 'Lead Fullstack Developer', job_family: 'Engineering', job_level: 'L6 Lead' },
  { id: '3', job_id: 'JOB-103', job_title: 'Cognitive Data Scientist', job_family: 'AI & Analytics', job_level: 'L5 Senior' },
  { id: '4', job_id: 'JOB-104', job_title: 'DevOps Architect', job_family: 'Infrastructure', job_level: 'L5 Senior' },
  { id: '5', job_id: 'JOB-105', job_title: 'Product Operations Manager', job_family: 'Product', job_level: 'L5 Senior' },
])

const fetchOptionsFromBackend = async () => {
  try {
    const [deptRes, jobRes] = await Promise.all([
      fetch('http://localhost:8000/api/v1/departments/').catch(() => null),
      fetch('http://localhost:8000/api/v1/jobs/').catch(() => null),
    ])

    if (deptRes?.ok) {
      const deptData = await deptRes.json()
      if (Array.isArray(deptData) && deptData.length > 0) {
        departments.value = deptData
      }
    }

    if (jobRes?.ok) {
      const jobData = await jobRes.json()
      if (Array.isArray(jobData) && jobData.length > 0) {
        jobs.value = jobData
      }
    }
  } catch (err) {
    console.warn('SelectInput backend sync notice:', err)
  }
}

onMounted(() => {
  fetchOptionsFromBackend()
})

const optionss = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'graphs', label: 'Graphs' },
]

const selectedItems = ref([])
</script>
