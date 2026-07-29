import type { Employee, PerformanceReview } from '../types/performance'

export interface AIEvaluationPrompt {
  employeeId: string;
  evaluationPeriod: string;
  managerNotes?: string;
}

export class CognitiveAIService {
  /**
   * Generates a data-driven performance review synthesis based on cognitive metric dimensions.
   */
  static async generatePerformanceEvaluation(
    employee: Employee,
    period: string,
    managerNotes: string = ''
  ): Promise<Partial<PerformanceReview>> {
    // Simulating cognitive AI analysis latency
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const { focusIndex, problemSolvingVelocity, cognitiveLoad, adaptabilityScore, collaborationEfficiency } = employee.metrics

    // Algorithmically calculate estimated rating based on cognitive composite
    const compositeScore = (focusIndex * 0.25) + (problemSolvingVelocity * 0.25) + (adaptabilityScore * 0.2) + (collaborationEfficiency * 0.2) - (cognitiveLoad > 85 ? 10 : 0)
    const overallRating = Math.min(5.0, Math.max(1.0, parseFloat((compositeScore / 20).toFixed(1))))

    const strengths: string[] = []
    const growthAreas: string[] = []

    if (focusIndex >= 85) strengths.push(`Exceptional Focus Index (${focusIndex}/100) with sustained deep work sessions.`)
    if (problemSolvingVelocity >= 85) strengths.push(`High Problem-Solving Velocity (${problemSolvingVelocity}/100) resolving complex technical blockers.`)
    if (collaborationEfficiency >= 85) strengths.push(`Strong Collaboration Efficiency (${collaborationEfficiency}/100) enhancing team output.`)
    if (adaptabilityScore >= 85) strengths.push(`Rapid Adaptability (${adaptabilityScore}/100) navigating cross-domain technical requirements.`)

    if (cognitiveLoad > 85) {
      growthAreas.push(`Sustained High Cognitive Load (${cognitiveLoad}/100) flags potential burnout. Recommend workload redistribution.`)
    }
    if (focusIndex < 70) {
      growthAreas.push(`Focus Index (${focusIndex}/100) indicates frequent context-switching friction. Recommend calendar focus blocks.`)
    }
    if (growthAreas.length === 0) {
      growthAreas.push('Maintain current momentum while exploring senior technical advisory opportunities.')
    }

    const cognitiveSummary = `${employee.name} demonstrates a strong cognitive profile with a ${focusIndex}% focus efficiency and ${problemSolvingVelocity}% problem-solving velocity. ${
      cognitiveLoad > 85
        ? 'However, cognitive load levels are critically elevated and require active manager intervention to prevent exhaustion.'
        : 'Cognitive load levels remain well-regulated within sustainable parameters.'
    }`

    const plainNotes = managerNotes ? managerNotes.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() : ''

    const aiGeneratedInsights = `AI Synthesis for ${period}: Employee exhibits top-tier technical delivery (${problemSolvingVelocity}/100). Manager focus should be on ${
      growthAreas[0]
    } ${plainNotes ? `[Manager Input Noted: "${plainNotes}"]` : ''}`

    return {
      employeeId: employee.id,
      period,
      reviewDate: new Date().toISOString().split('T')[0],
      overallRating,
      cognitiveSummary,
      strengths,
      growthAreas,
      aiGeneratedInsights,
      managerNotes,
      status: 'draft'
    }
  }

  /**
   * Generates actionable coaching recommendations for an employee based on cognitive trends.
   */
  static generateCoachingTips(employee: Employee): string[] {
    const tips: string[] = []
    if (employee.metrics.cognitiveLoad > 85) {
      tips.push('Encourage 2-hour zero-meeting focus zones every afternoon.')
      tips.push('Audit recurring meeting invitations to reduce cognitive context switching.')
    }
    if (employee.metrics.focusIndex > 85 && employee.metrics.problemSolvingVelocity > 85) {
      tips.push('Pair with mid-level engineers to mentor and scale technical problem-solving patterns.')
    }
    if (employee.metrics.adaptabilityScore < 80) {
      tips.push('Provide structured onboarding documentation when transitioning into new codebases or domains.')
    }
    return tips
  }
}
