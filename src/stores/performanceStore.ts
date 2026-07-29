import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Employee, PerformanceReview, AIInsight } from '../types/performance'

export const usePerformanceStore = defineStore('performance', () => {
  const employees = ref<Employee[]>([
    {
      id: 'emp-1',
      name: 'Sarah Chen',
      email: 'sarah.chen@cognitivemetrics.ai',
      role: 'Senior AI Engineer',
      department: 'Engineering',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      joinDate: '2023-03-15',
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
      id: 'emp-2',
      name: 'Marcus Vance',
      email: 'marcus.vance@cognitivemetrics.ai',
      role: 'Full Stack Tech Lead',
      department: 'Engineering',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      joinDate: '2022-09-01',
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
      id: 'emp-3',
      name: 'Elena Rostova',
      email: 'elena.rostova@cognitivemetrics.ai',
      role: 'Product Designer',
      department: 'Product & UX',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      joinDate: '2024-01-10',
      burnoutRiskLevel: 'moderate',
      recentReviewsCount: 2,
      metrics: {
        focusIndex: 79,
        problemSolvingVelocity: 85,
        cognitiveLoad: 78,
        adaptabilityScore: 92,
        collaborationEfficiency: 88,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 75, cognitiveLoad: 70, velocity: 78 },
        { date: 'Mar', focusIndex: 76, cognitiveLoad: 72, velocity: 80 },
        { date: 'Apr', focusIndex: 78, cognitiveLoad: 74, velocity: 82 },
        { date: 'May', focusIndex: 77, cognitiveLoad: 76, velocity: 83 },
        { date: 'Jun', focusIndex: 80, cognitiveLoad: 77, velocity: 84 },
        { date: 'Jul', focusIndex: 79, cognitiveLoad: 78, velocity: 85 }
      ]
    },
    {
      id: 'emp-4',
      name: 'David Kim',
      email: 'david.kim@cognitivemetrics.ai',
      role: 'Backend Infrastructure Engineer',
      department: 'DevOps & Cloud',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      joinDate: '2023-11-20',
      burnoutRiskLevel: 'low',
      recentReviewsCount: 3,
      metrics: {
        focusIndex: 91,
        problemSolvingVelocity: 88,
        cognitiveLoad: 68,
        adaptabilityScore: 84,
        collaborationEfficiency: 79,
        timestamp: '2026-07-28'
      },
      historicalTrends: [
        { date: 'Feb', focusIndex: 85, cognitiveLoad: 60, velocity: 82 },
        { date: 'Mar', focusIndex: 87, cognitiveLoad: 62, velocity: 84 },
        { date: 'Apr', focusIndex: 88, cognitiveLoad: 65, velocity: 86 },
        { date: 'May', focusIndex: 90, cognitiveLoad: 66, velocity: 87 },
        { date: 'Jun', focusIndex: 90, cognitiveLoad: 67, velocity: 87 },
        { date: 'Jul', focusIndex: 91, cognitiveLoad: 68, velocity: 88 }
      ]
    }
  ])

  const reviews = ref<PerformanceReview[]>([
    {
      id: 'rev-1',
      employeeId: 'emp-1',
      period: 'H1 2026',
      reviewDate: '2026-06-30',
      overallRating: 4.8,
      cognitiveSummary: 'Sarah exhibits exceptional deep work concentration and rapid problem resolution in complex AI pipeline tasks.',
      strengths: ['Focus Index in 90th percentile', 'Outstanding problem-solving velocity', 'Proactive cross-functional guidance'],
      growthAreas: ['Delegate baseline validation tasks to increase bandwidth for core model R&D'],
      aiGeneratedInsights: 'Cognitive metrics highlight sustained high focus with low burnout risk. Highly recommended for lead architect path.',
      status: 'approved'
    },
    {
      id: 'rev-2',
      employeeId: 'emp-2',
      period: 'H1 2026',
      reviewDate: '2026-06-30',
      overallRating: 4.2,
      cognitiveSummary: 'Marcus drives immense technical delivery but is currently experiencing persistent high cognitive load (>90%).',
      strengths: ['Strong technical leadership', 'High collaboration efficiency', 'Unmatched domain expertise'],
      growthAreas: ['Reduce meeting density', 'Implement uninterrupted 3-hour focus blocks', 'Offload team code review triage'],
      aiGeneratedInsights: 'Burnout Alert: Cognitive load has exceeded 88% for 3 consecutive months. High risk of cognitive fatigue unless meeting friction is reduced.',
      status: 'submitted'
    }
  ])

  const insights = ref<AIInsight[]>([
    {
      id: 'ins-1',
      employeeId: 'emp-2',
      type: 'burnout_alert',
      title: 'High Cognitive Sustained Load Warning',
      description: 'Marcus Vance has maintained a cognitive load over 90% for 90 days with declining focus index.',
      recommendedAction: 'Schedule a workload rebalancing sync & introduce mandatory zero-meeting focus blocks.',
      confidenceScore: 0.94,
      createdAt: '2026-07-27'
    },
    {
      id: 'ins-2',
      employeeId: 'emp-1',
      type: 'high_performer',
      title: 'Accelerated Problem-Solving Velocity',
      description: 'Sarah Chen solved 3 high-complexity algorithmic challenges this month with 88% deep focus.',
      recommendedAction: 'Consider for technical project lead role in upcoming Q3 AI expansion.',
      confidenceScore: 0.91,
      createdAt: '2026-07-25'
    }
  ])

  // Filters & State
  const selectedDepartment = ref<string>('All')
  const searchQuery = ref<string>('')

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
    return employees.value.find(emp => emp.id === id)
  }

  function addReview(review: PerformanceReview) {
    reviews.value.unshift(review)
  }

  return {
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
    addReview
  }
})
