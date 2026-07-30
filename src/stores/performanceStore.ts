import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import type { Employee, PerformanceReview, AIInsight } from '../types/performance'

export interface CompetencyItem {
  id: string
  competency_id: string
  name: string
  category?: string
  target_rating?: number
  description?: string
}

export interface JobItem {
  id: string
  job_id: string
  job_title: string
  job_family?: string
  job_level?: string
  job_description?: string
  competencies?: CompetencyItem[]
}

export interface DepartmentItem {
  id: string
  department_id: string
  name: string
  description?: string
}

export interface RoleItem {
  id: string
  role_id: string
  name: string
  description?: string
}

export const usePerformanceStore = defineStore('performance', () => {
  const departments = ref<DepartmentItem[]>([])
  const jobs = ref<JobItem[]>([])
  const roles = ref<RoleItem[]>([])

  const employees = ref<Employee[]>([
    {
      id: 'EMP-1001',
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@cognitivemetrics.ai',
      role: 'Senior Design Engineer',
      department: 'Design',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      joinDate: '2020-03-15',
      burnoutRiskLevel: 'low',
      recentReviewsCount: 4,
      metrics: {
        focusIndex: 88,
        problemSolvingVelocity: 94,
        cognitiveLoad: 72,
        adaptabilityScore: 90,
        collaborationEfficiency: 86,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 80, cognitiveLoad: 65, velocity: 85 },
        { date: 'Mar', focusIndex: 82, cognitiveLoad: 68, velocity: 88 },
        { date: 'Apr', focusIndex: 85, cognitiveLoad: 70, velocity: 90 },
        { date: 'May', focusIndex: 84, cognitiveLoad: 74, velocity: 91 },
        { date: 'Jun', focusIndex: 87, cognitiveLoad: 71, velocity: 93 },
        { date: 'Jul', focusIndex: 88, cognitiveLoad: 72, velocity: 94 }
      ]
    },
    {
      id: 'EMP-1002',
      name: 'Marcus Vance',
      email: 'marcus.vance@cognitivemetrics.ai',
      role: 'Lead Fullstack Developer',
      department: 'Engineering',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      joinDate: '2019-08-01',
      burnoutRiskLevel: 'high',
      recentReviewsCount: 6,
      metrics: {
        focusIndex: 64,
        problemSolvingVelocity: 82,
        cognitiveLoad: 92,
        adaptabilityScore: 78,
        collaborationEfficiency: 91,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 78, cognitiveLoad: 75, velocity: 80 },
        { date: 'Mar', focusIndex: 74, cognitiveLoad: 80, velocity: 81 },
        { date: 'Apr', focusIndex: 70, cognitiveLoad: 85, velocity: 83 },
        { date: 'May', focusIndex: 68, cognitiveLoad: 89, velocity: 82 },
        { date: 'Jun', focusIndex: 65, cognitiveLoad: 91, velocity: 82 },
        { date: 'Jul', focusIndex: 64, cognitiveLoad: 92, velocity: 82 }
      ]
    },
    {
      id: 'EMP-1003',
      name: 'Elena Rostova',
      email: 'elena.rostova@cognitivemetrics.ai',
      role: 'Cognitive Data Scientist',
      department: 'AI & Analytics',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      joinDate: '2022-01-10',
      burnoutRiskLevel: 'moderate',
      recentReviewsCount: 3,
      metrics: {
        focusIndex: 91,
        problemSolvingVelocity: 89,
        cognitiveLoad: 76,
        adaptabilityScore: 94,
        collaborationEfficiency: 82,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 85, cognitiveLoad: 70, velocity: 84 },
        { date: 'Mar', focusIndex: 88, cognitiveLoad: 72, velocity: 86 },
        { date: 'Apr', focusIndex: 89, cognitiveLoad: 75, velocity: 87 },
        { date: 'May', focusIndex: 90, cognitiveLoad: 74, velocity: 88 },
        { date: 'Jun', focusIndex: 91, cognitiveLoad: 76, velocity: 89 },
        { date: 'Jul', focusIndex: 91, cognitiveLoad: 76, velocity: 89 }
      ]
    },
    {
      id: 'EMP-1004',
      name: 'David Chen',
      email: 'david.chen@cognitivemetrics.ai',
      role: 'DevOps Architect',
      department: 'Infrastructure',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      joinDate: '2021-06-18',
      burnoutRiskLevel: 'low',
      recentReviewsCount: 5,
      metrics: {
        focusIndex: 85,
        problemSolvingVelocity: 88,
        cognitiveLoad: 68,
        adaptabilityScore: 86,
        collaborationEfficiency: 89,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 80, cognitiveLoad: 62, velocity: 82 },
        { date: 'Mar', focusIndex: 82, cognitiveLoad: 64, velocity: 84 },
        { date: 'Apr', focusIndex: 84, cognitiveLoad: 66, velocity: 86 },
        { date: 'May', focusIndex: 85, cognitiveLoad: 67, velocity: 87 },
        { date: 'Jun', focusIndex: 85, cognitiveLoad: 68, velocity: 88 },
        { date: 'Jul', focusIndex: 85, cognitiveLoad: 68, velocity: 88 }
      ]
    },
    {
      id: 'EMP-1005',
      name: 'Amara Okafor',
      email: 'amara.okafor@cognitivemetrics.ai',
      role: 'Product Operations Manager',
      department: 'Product',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      joinDate: '2023-04-03',
      burnoutRiskLevel: 'low',
      recentReviewsCount: 2,
      metrics: {
        focusIndex: 89,
        problemSolvingVelocity: 85,
        cognitiveLoad: 64,
        adaptabilityScore: 92,
        collaborationEfficiency: 95,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 84, cognitiveLoad: 60, velocity: 80 },
        { date: 'Mar', focusIndex: 86, cognitiveLoad: 61, velocity: 82 },
        { date: 'Apr', focusIndex: 87, cognitiveLoad: 63, velocity: 83 },
        { date: 'May', focusIndex: 88, cognitiveLoad: 62, velocity: 84 },
        { date: 'Jun', focusIndex: 89, cognitiveLoad: 64, velocity: 85 },
        { date: 'Jul', focusIndex: 89, cognitiveLoad: 64, velocity: 85 }
      ]
    }
  ])

  const reviews = ref<PerformanceReview[]>([
    {
      id: 'rev-101',
      employeeId: 'EMP-1002',
      reviewerId: 'mgr-1',
      period: 'Q2 2026',
      reviewDate: '2026-07-15',
      overallRating: 4.2,
      cognitiveSummary: 'Demonstrated high technical velocity but showed elevated cognitive fatigue during sprint crunches.',
      aiGeneratedInsights: 'Rebalancing asynchronous code reviews is recommended to mitigate burnout risk.',
      managerNotes: 'Marcus has performed extraordinarily well leading fullstack architecture. We will introduce focus blocks for deep work.',
      status: 'submitted'
    }
  ])

  const insights = ref<AIInsight[]>([
    {
      id: 'ins-1',
      employeeId: 'EMP-1002',
      type: 'burnout_alert',
      title: 'High Cognitive Sustained Load Warning',
      description: 'Marcus Vance has maintained a cognitive load over 90% for 90 days with declining focus index.',
      recommendedAction: 'Schedule a workload rebalancing sync & introduce mandatory zero-meeting focus blocks.',
      confidenceScore: 0.94,
      createdAt: '2026-07-27'
    },
    {
      id: 'ins-2',
      employeeId: 'EMP-1001',
      type: 'high_performer',
      title: 'Accelerated Problem-Solving Velocity',
      description: 'Sarah Jenkins solved 3 high-complexity architectural design challenges with 88% deep focus.',
      recommendedAction: 'Consider for technical design lead role in upcoming Q3 expansion.',
      confidenceScore: 0.91,
      createdAt: '2026-07-25'
    }
  ])

  // Filters & State
  const selectedDepartment = ref<string>('All')
  const searchQuery = ref<string>('')

  // Fetch live departments, jobs, competencies, and employees from Neon DB backend API
  const fetchBackendData = async () => {
    try {
      const [deptRes, jobRes, userRes] = await Promise.all([
        fetch('http://localhost:8000/api/v1/departments/').catch(() => null),
        fetch('http://localhost:8000/api/v1/jobs/').catch(() => null),
        fetch('http://localhost:8000/api/v1/users/').catch(() => null),
      ])

      if (deptRes?.ok) {
        const deptData = await deptRes.json()
        if (Array.isArray(deptData)) departments.value = deptData
      }

      if (jobRes?.ok) {
        const jobData = await jobRes.json()
        if (Array.isArray(jobData)) jobs.value = jobData
      }

      if (userRes?.ok) {
        const userData = await userRes.json()
        if (Array.isArray(userData) && userData.length > 0) {
          const loaded: Employee[] = []
          for (const item of userData) {
            const empId = item.employee_id || item.custom_metadata?.employee_id
            if (empId || item.email?.includes('cognitivemetrics.ai')) {
              loaded.push({
                id: empId || item.id,
                name: item.full_name || `${item.first_name || ''} ${item.last_name || ''}`.trim() || 'Employee',
                email: item.email,
                role: item.role || 'Employee',
                department: item.department || 'General',
                avatarUrl: item.photo_url || item.custom_metadata?.photo_url || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
                joinDate: item.doh || item.custom_metadata?.doh || '2021-01-01',
                burnoutRiskLevel: item.role?.includes('Lead') ? 'high' : 'low',
                recentReviewsCount: 3,
                metrics: {
                  focusIndex: 85,
                  problemSolvingVelocity: 88,
                  cognitiveLoad: 70,
                  adaptabilityScore: 88,
                  collaborationEfficiency: 86,
                  timestamp: '2026-07-28'
                },
                historicalTrends: [
                  { date: 'Feb', focusIndex: 80, cognitiveLoad: 65, velocity: 82 },
                  { date: 'Mar', focusIndex: 82, cognitiveLoad: 67, velocity: 84 },
                  { date: 'Apr', focusIndex: 84, cognitiveLoad: 68, velocity: 86 },
                  { date: 'May', focusIndex: 85, cognitiveLoad: 69, velocity: 87 },
                  { date: 'Jun', focusIndex: 85, cognitiveLoad: 70, velocity: 88 },
                  { date: 'Jul', focusIndex: 85, cognitiveLoad: 70, velocity: 88 }
                ]
              })
            }
          }
          if (loaded.length > 0) {
            employees.value = loaded
          }
        }
      }
    } catch (err) {
      console.warn('Neon DB sync notice in performanceStore:', err)
    }
  }

  // Computed Properties
  const filteredEmployees = computed(() => {
    return employees.value.filter((emp) => {
      const matchesDept = selectedDepartment.value === 'All' || emp.department === selectedDepartment.value
      const matchesQuery = emp.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                           emp.role.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesDept && matchesQuery
    })
  })

  const averageFocusIndex = computed(() => {
    if (!employees.value.length) return 0
    const total = employees.value.reduce((sum, emp) => sum + emp.metrics.focusIndex, 0)
    return Math.round(total / employees.value.length)
  })

  const averageCognitiveLoad = computed(() => {
    if (!employees.value.length) return 0
    const total = employees.value.reduce((sum, emp) => sum + emp.metrics.cognitiveLoad, 0)
    return Math.round(total / employees.value.length)
  })

  const highBurnoutCount = computed(() => {
    return employees.value.filter(emp => emp.burnoutRiskLevel === 'high').length
  })

  function getEmployeeById(id: string) {
    return employees.value.find(emp => emp.id === id || emp.email?.includes(id))
  }

  function addReview(review: PerformanceReview) {
    reviews.value.unshift(review)
  }

  return {
    departments,
    roles,
    employees,
    reviews,
    insights,
    selectedDepartment,
    searchQuery,
    filteredEmployees,
    averageFocusIndex,
    averageCognitiveLoad,
    highBurnoutCount,
    getEmployeeById,
    addReview,
    fetchBackendData
  }
})
