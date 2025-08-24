<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12"
    >
      <div class="mx-auto w-full max-w-[630px] text-center">

  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
    <div class="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-6 sm:p-10 border border-gray-200">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-8 sm:mb-12">AI Text Rewriter</h1>

      <!-- Question 1 -->
      <div class="space-y-6 sm:space-y-8">
        <div>
          <label for="q1" class="block text-sm font-medium text-gray-700 mb-2">
            Question 1: What is the main objective of the project?
          </label>
          <textarea
            id="q1"
            rows="4"
            class="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none p-3"
            placeholder="Enter your first point here..."
            v-model="question1"
          ></textarea>
          <button
            @click="rewriteText('q1')"
            :disabled="loading.q1 || !question1.trim()"
            class="mt-4 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-105 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            <span v-if="loading.q1" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Rewriting...
            </span>
            <span v-else>Rewrite Q1</span>
          </button>
        </div>

        <!-- Question 2 -->
        <div class="pt-6 border-t border-gray-200">
          <label for="q2" class="block text-sm font-medium text-gray-700 mb-2">
            Question 2: What are the key challenges you anticipate?
          </label>
          <textarea
            id="q2"
            rows="4"
            class="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none p-3"
            placeholder="Enter your second point here..."
            v-model="question2"
          ></textarea>
          <button
            @click="rewriteText('q2')"
            :disabled="loading.q2 || !question2.trim()"
            class="mt-4 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-105 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            <span v-if="loading.q2" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Rewriting...
            </span>
            <span v-else>Rewrite Q2</span>
          </button>
        </div>

        <!-- Question 3 -->
        <div class="pt-6 border-t border-gray-200">
          <label for="q3" class="block text-sm font-medium text-gray-700 mb-2">
            Question 3: What is the desired outcome or success metric?
          </label>
          <textarea
            id="q3"
            rows="4"
            class="w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none p-3"
            placeholder="Enter your third point here..."
            v-model="question3"
          ></textarea>
          <button
            @click="rewriteText('q3')"
            :disabled="loading.q3 || !question3.trim()"
            class="mt-4 w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-105 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            <span v-if="loading.q3" class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Rewriting...
            </span>
            <span v-else>Rewrite Q3</span>
          </button>
        </div>
      </div>
      
      <!-- Error message -->
      <div v-if="error" class="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative text-sm" role="alert">
        <span class="block sm:inline">An error occurred: {{ error }}</span>
      </div>
    </div>
  </div>

      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { ref } from 'vue';

const currentPageTitle = ref('Blank Page');
const question1 = ref<string>('');
const question2 = ref<string>('');
const question3 = ref<string>('');
const loading = ref<{ q1: boolean; q2: boolean; q3: boolean }>({ q1: false, q2: false, q3: false });
const error = ref<string | null>(null);

/**
 * Calls the Gemini AI to rewrite the text for a specific question.
 * @param {string} field The identifier for the field to update ('q1', 'q2', or 'q3').
 */
const rewriteText = async (field: 'q1' | 'q2' | 'q3') => {
  loading.value = { ...loading.value, [field]: true };
  error.value = null;

  let textToRewrite: string;
  let setFunction: (value: string) => void;

  switch (field) {
    case 'q1':
      textToRewrite = question1.value;
      setFunction = (val: string) => (question1.value = val);
      break;
    case 'q2':
      textToRewrite = question2.value;
      setFunction = (val: string) => (question2.value = val);
      break;
    case 'q3':
      textToRewrite = question3.value;
      setFunction = (val: string) => (question3.value = val);
      break;
    default:
      loading.value = { ...loading.value, [field]: false };
      return;
  }

  let attempts = 0;
  const maxAttempts = 5;
  const baseDelay = 1000;

  const prompt = `Rewrite the following text only. Do not provide suggestions or feedback.\n\n${textToRewrite}`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }],
  };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=AIzaSyAk-_NNpQ510g7tILIbJYRgjOVXIXrjyIQ`;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 429) {
          const delay = baseDelay * Math.pow(2, attempts) + Math.random() * 1000;
          console.warn(`Attempt ${attempts + 1}: Rate limited. Retrying in ${delay / 1000} seconds.`);
          await new Promise(res => setTimeout(res, delay));
          attempts++;
          continue;
        }
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const text = result.candidates[0].content.parts[0].text;
        setFunction(text);
      } else {
        error.value = 'Failed to get a response from the AI. Please try again.';
      }

      break;
    } catch (e: any) {
      error.value = `An unexpected error occurred: ${e.message}`;
      console.error(e);
      break;
    } finally {
      loading.value = { ...loading.value, [field]: false };
    }
  }
};
</script>