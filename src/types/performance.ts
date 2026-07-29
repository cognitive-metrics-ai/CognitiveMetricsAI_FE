export interface CognitiveMetric {
  focusIndex: number; // 0 - 100: uninterrupted deep work ratio
  problemSolvingVelocity: number; // 0 - 100: resolution speed vs complexity
  cognitiveLoad: number; // 0 - 100: current intensity vs burn risk
  adaptabilityScore: number; // 0 - 100: context switching & domain mastery
  collaborationEfficiency: number; // 0 - 100: peer review & cross-functional impact
  timestamp: string;
}

export interface CognitiveTrendPoint {
  date: string;
  focusIndex: number;
  cognitiveLoad: number;
  velocity: number;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  period: string; // e.g. "Q1 2026", "H1 2026"
  reviewDate: string;
  overallRating: number; // 1 to 5
  cognitiveSummary: string;
  strengths: string[];
  growthAreas: string[];
  aiGeneratedInsights: string;
  managerNotes?: string;
  status: 'draft' | 'submitted' | 'approved';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl: string;
  metrics: CognitiveMetric;
  historicalTrends: CognitiveTrendPoint[];
  burnoutRiskLevel: 'low' | 'moderate' | 'high';
  recentReviewsCount: number;
  joinDate: string;
}

export interface AIInsight {
  id: string;
  employeeId: string;
  type: 'burnout_alert' | 'growth_opportunity' | 'high_performer' | 'collaboration_anomaly';
  title: string;
  description: string;
  recommendedAction: string;
  confidenceScore: number; // 0 to 1
  createdAt: string;
}
