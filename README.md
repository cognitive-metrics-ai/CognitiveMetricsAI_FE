# Cognitive Metrics AI

Cognitive Metrics AI is a web application for managers to understand team performance through cognitive-workload signals and turn those insights into more informed performance conversations.

The platform combines a team performance dashboard, individual cognitive profiles, and an AI-assisted review workflow to help leaders identify strengths, workload risks, and development opportunities.

## What the Site Offers

- **Team performance dashboard** with focus index, cognitive-load, burnout-risk, and monitored-team metrics.
- **Employee cognitive profiles** that surface focus, problem-solving velocity, cognitive load, adaptability, and collaboration efficiency.
- **Actionable recommendations** for workload balancing, burnout prevention, focus protection, and employee development.
- **Team filtering and search** by employee name and department.
- **AI-assisted performance-review drafts** that synthesize an employee's metrics with manager observations into strengths, growth areas, an overall rating, and management guidance.
- **Review publishing workflow** for saving approved performance reviews to an employee profile.
- **Authentication and protected routes** powered by Firebase Authentication.
- **Responsive, dark-mode-ready interface** built for modern management teams.

## Technology

- Vue 3 and TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- Firebase Authentication

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install and Run

```bash
git clone https://github.com/cognitive-metrics-ai/CognitiveMetricsAI_FE.git
cd CognitiveMetricsAI_FE
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

### Available Commands

```bash
npm run dev        # Start the development server
npm run build      # Type-check and create a production build
npm run type-check # Run Vue and TypeScript checks
npm run lint       # Run ESLint with automatic fixes
npm run preview    # Preview the production build locally
```

## Product Flow

1. Sign in to access the protected Performance Center.
2. Review team-level focus, workload, and burnout-risk indicators.
3. Search or filter employees, then open an employee's cognitive profile.
4. Generate a performance-review draft using the employee's metrics and optional manager notes.
5. Review the generated strengths, growth areas, rating, and guidance before publishing.

## Project Status

The application currently presents a functional frontend experience with sample performance data and an in-browser AI-review synthesis service. Connect the data store and review workflow to your organization’s approved backend services before using it with production employee data.
