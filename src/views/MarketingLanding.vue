<template>
  <div class="min-h-screen bg-gray-950 text-white font-outfit selection:bg-purple-500 selection:text-white">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img class="h-10 w-auto max-w-[220px] object-contain" src="/images/logo/logo_dark.png" alt="Cognitive Metrics AI Logo" />
        </router-link>

        <!-- Nav Links -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#features" class="hover:text-white transition">Features</a>
          <a href="#analytics" class="hover:text-white transition">Analytics</a>
          <a href="#enterprise" class="hover:text-white transition">Enterprise API</a>
          <a href="#pricing" class="hover:text-white transition">Pricing</a>
        </nav>

        <!-- Auth CTA -->
        <div class="flex items-center gap-4">
          <router-link
            to="/signin"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold shadow-lg shadow-purple-500/25 transition duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Sign In
          </router-link>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-24 overflow-hidden">
      <!-- Background Glow Effect -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Pill Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8">
          <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          Next-Generation Cognitive Performance Management
        </div>

        <!-- Main Headline -->
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight max-w-5xl mx-auto">
          Drive Team Growth with Real-Time <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Cognitive Metrics</span>
        </h1>

        <!-- Subheadline -->
        <p class="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Move beyond static annual reviews. Cognitive Metrics AI tracks focus indices, balances workload intensity, and automates data-driven performance reviews for modern teams.
        </p>

        <!-- CTA Buttons -->
        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link
            to="/signin"
            class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:opacity-95 text-white font-bold text-base shadow-xl shadow-purple-500/20 transition flex items-center justify-center gap-3"
          >
            <span>Sign In to Access Dashboard</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
          <a
            href="#features"
            class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 font-semibold text-base transition flex items-center justify-center"
          >
            Explore Platform Features
          </a>
        </div>

        <!-- Glassmorphism Preview Mockup -->
        <div class="mt-16 relative max-w-5xl mx-auto rounded-3xl border border-gray-800/80 bg-gray-900/60 p-4 backdrop-blur-2xl shadow-2xl shadow-purple-950/40">
          <div class="flex items-center gap-2 mb-4 px-2">
            <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
            <span class="text-xs text-gray-500 ml-2">Cognitive Metrics AI — Executive Dashboard Preview</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div class="p-5 rounded-2xl bg-gray-950/70 border border-gray-800/60">
              <div class="text-xs text-purple-400 font-semibold uppercase">Average Focus Index</div>
              <div class="text-3xl font-extrabold text-white mt-1">94.2%</div>
              <div class="text-xs text-emerald-400 mt-1">↑ +4.2% vs last month</div>
              <div class="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div class="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[94%]"></div>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-gray-950/70 border border-gray-800/60">
              <div class="text-xs text-indigo-400 font-semibold uppercase">Cognitive Workload</div>
              <div class="text-3xl font-extrabold text-white mt-1">72.8%</div>
              <div class="text-xs text-amber-400 mt-1">Optimal Range (Balanced)</div>
              <div class="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[72%]"></div>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-gray-950/70 border border-gray-800/60">
              <div class="text-xs text-pink-400 font-semibold uppercase">AI Reviews Completed</div>
              <div class="text-3xl font-extrabold text-white mt-1">128</div>
              <div class="text-xs text-purple-300 mt-1">100% Bias-free verified</div>
              <div class="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-[100%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 border-t border-gray-900 bg-gray-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Built for Modern High-Performing Teams</h2>
          <p class="text-gray-400 mt-4 text-base">Replace subjective manager evaluations with continuous data insights and cognitive load balancing.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/80 hover:border-purple-500/40 transition">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
              ⚡
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Real-time Focus Tracking</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Monitor context-switching overhead and measure uninterrupted focus time to optimize team output.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/80 hover:border-indigo-500/40 transition">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
              🤖
            </div>
            <h3 class="text-xl font-bold text-white mb-3">AI Review Generator</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Generate comprehensive, objective performance reviews in seconds based on verified empirical achievements.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="p-8 rounded-2xl bg-gray-900/50 border border-gray-800/80 hover:border-pink-500/40 transition">
            <div class="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-6">
              🔌
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Enterprise Database Sync</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Connect FastAPI backend endpoints directly to your Neon PostgreSQL database with flexible custom schema fields.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 border-t border-gray-900 bg-gray-950/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Simple, Transparent Enterprise Plans</h2>
          <p class="text-gray-400 mt-4 text-base">Select the plan that fits your organization's engineering size.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Starter -->
          <div class="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">Starter</h3>
              <p class="text-xs text-gray-400 mt-1">For small teams getting started</p>
              <div class="text-3xl font-extrabold text-white mt-4">$12 <span class="text-sm font-normal text-gray-400">/ user / mo</span></div>
              <ul class="mt-6 space-y-3 text-sm text-gray-400">
                <li class="flex items-center gap-2">✓ Up to 15 team members</li>
                <li class="flex items-center gap-2">✓ Basic Focus Index Tracking</li>
                <li class="flex items-center gap-2">✓ Standard Performance Reviews</li>
              </ul>
            </div>
            <router-link to="/signin" class="mt-8 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-center block text-sm transition">
              Get Started
            </router-link>
          </div>

          <!-- Pro (Highlighted) -->
          <div class="p-8 rounded-2xl bg-gradient-to-b from-purple-900/30 to-gray-900 border-2 border-purple-500 relative flex flex-col justify-between shadow-xl shadow-purple-950/50">
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">Pro Enterprise</h3>
              <p class="text-xs text-gray-300 mt-1">For growing tech organizations</p>
              <div class="text-3xl font-extrabold text-white mt-4">$29 <span class="text-sm font-normal text-gray-400">/ user / mo</span></div>
              <ul class="mt-6 space-y-3 text-sm text-gray-300">
                <li class="flex items-center gap-2">✓ Unlimited team members</li>
                <li class="flex items-center gap-2">✓ Real-time AI Workload Balancing</li>
                <li class="flex items-center gap-2">✓ Neon DB & Custom Schema Sync</li>
                <li class="flex items-center gap-2">✓ Full AI Review Generator</li>
              </ul>
            </div>
            <router-link to="/signin" class="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-center block text-sm shadow-lg shadow-purple-500/20 transition">
              Sign In to Start
            </router-link>
          </div>

          <!-- Enterprise -->
          <div class="p-8 rounded-2xl bg-gray-900/40 border border-gray-800 flex flex-col justify-between">
            <div>
              <h3 class="text-lg font-bold text-white">Custom Enterprise</h3>
              <p class="text-xs text-gray-400 mt-1">For large-scale organizations</p>
              <div class="text-3xl font-extrabold text-white mt-4">Custom</div>
              <ul class="mt-6 space-y-3 text-sm text-gray-400">
                <li class="flex items-center gap-2">✓ Dedicated Fast API Cluster</li>
                <li class="flex items-center gap-2">✓ Custom Repository Adapters</li>
                <li class="flex items-center gap-2">✓ 24/7 Priority SLA Support</li>
              </ul>
            </div>
            <router-link to="/signin" class="mt-8 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold text-center block text-sm transition">
              Contact Sales
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-900 text-center text-xs text-gray-500">
      <div class="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© 2026 Performance Dynamics Inc. All rights reserved.</div>
        <div class="flex items-center gap-6">
          <router-link to="/signin" class="hover:text-gray-300">Sign In</router-link>
          <a href="#features" class="hover:text-gray-300">Features</a>
          <a href="#pricing" class="hover:text-gray-300">Pricing</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
