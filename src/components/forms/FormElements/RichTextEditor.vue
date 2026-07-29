<template>
  <div
    :class="[
      'rich-text-editor transition-all duration-200',
      isFullscreen
        ? 'fixed inset-0 z-[99999] h-screen w-screen rounded-none flex flex-col bg-white dark:bg-gray-900 border-none shadow-2xl'
        : 'relative border border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent overflow-hidden'
    ]"
  >
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-1.5 p-2 bg-gray-100/90 dark:bg-gray-800/90 border-b border-gray-200 dark:border-gray-700 select-none">
      <!-- Format Controls Group -->
      <div class="flex flex-wrap items-center gap-1">
        <!-- Bold -->
        <button
          type="button"
          @click="exec('bold')"
          :class="[
            'p-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center w-7 h-7',
            activeFormats.bold ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Bold (Ctrl+B)"
        >
          B
        </button>

        <!-- Italic -->
        <button
          type="button"
          @click="exec('italic')"
          :class="[
            'p-1.5 rounded-lg text-xs italic font-serif transition flex items-center justify-center w-7 h-7',
            activeFormats.italic ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Italic (Ctrl+I)"
        >
          I
        </button>

        <!-- Underline -->
        <button
          type="button"
          @click="exec('underline')"
          :class="[
            'p-1.5 rounded-lg text-xs underline transition flex items-center justify-center w-7 h-7',
            activeFormats.underline ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Underline (Ctrl+U)"
        >
          U
        </button>

        <!-- Strikethrough -->
        <button
          type="button"
          @click="exec('strikeThrough')"
          :class="[
            'p-1.5 rounded-lg text-xs line-through transition flex items-center justify-center w-7 h-7',
            activeFormats.strikeThrough ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Strikethrough"
        >
          S
        </button>

        <span class="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></span>

        <!-- Headings Select -->
        <select
          v-model="currentBlock"
          @change="applyHeading"
          class="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer"
        >
          <option value="p">Paragraph</option>
          <option value="h3">Heading 3</option>
          <option value="h2">Heading 2</option>
          <option value="h1">Heading 1</option>
        </select>

        <span class="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></span>

        <!-- Bullet List -->
        <button
          type="button"
          @click="exec('insertUnorderedList')"
          :class="[
            'p-1.5 rounded-lg text-xs transition flex items-center justify-center w-7 h-7',
            activeFormats.insertUnorderedList ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Bullet List"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16M2 6h.01M2 12h.01M2 18h.01"/>
          </svg>
        </button>

        <!-- Numbered List -->
        <button
          type="button"
          @click="exec('insertOrderedList')"
          :class="[
            'p-1.5 rounded-lg text-xs transition flex items-center justify-center w-7 h-7',
            activeFormats.insertOrderedList ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Numbered List"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6h14M7 12h14M7 18h14M3 6h1M3 12h1M3 18h1"/>
          </svg>
        </button>

        <!-- Quote -->
        <button
          type="button"
          @click="execBlock('blockquote')"
          :class="[
            'p-1.5 rounded-lg text-xs transition flex items-center justify-center w-7 h-7',
            activeFormats.blockquote ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Blockquote"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
        </button>

        <!-- Code Block -->
        <button
          type="button"
          @click="execBlock('pre')"
          :class="[
            'p-1.5 rounded-lg text-xs font-mono transition flex items-center justify-center w-7 h-7',
            activeFormats.pre ? 'bg-indigo-600 text-white shadow-xs' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          title="Code Block"
        >
          &lt;/&gt;
        </button>

        <span class="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-1"></span>

        <!-- Insert Link -->
        <button
          type="button"
          @click="insertLink"
          class="p-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center w-7 h-7"
          title="Insert Hyperlink"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
          </svg>
        </button>

        <!-- Clear Formatting -->
        <button
          type="button"
          @click="exec('removeFormat')"
          class="p-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center w-7 h-7"
          title="Clear Formatting"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>

      <!-- Actions / Presets & Fullscreen Group -->
      <div class="flex items-center gap-1">
        <!-- Quick Note Templates Dropdown -->
        <div class="relative">
          <button
            type="button"
            @click="showTemplates = !showTemplates"
            class="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold px-2 py-1 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition flex items-center gap-1 border border-indigo-200 dark:border-indigo-800"
          >
            <span>✨ Templates</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showTemplates"
            class="absolute right-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 py-1"
          >
            <div class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-700">
              Insert Observation Template
            </div>
            <button
              v-for="tpl in noteTemplates"
              :key="tpl.label"
              type="button"
              @click="insertTemplate(tpl.html)"
              class="w-full text-left px-3 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition flex items-center justify-between"
            >
              <span>{{ tpl.label }}</span>
              <span class="text-[10px] text-gray-400">+ Insert</span>
            </button>
          </div>
        </div>

        <span class="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-0.5"></span>

        <!-- Undo -->
        <button
          type="button"
          @click="exec('undo')"
          class="p-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center w-7 h-7"
          title="Undo"
        >
          ↩
        </button>

        <!-- Redo -->
        <button
          type="button"
          @click="exec('redo')"
          class="p-1.5 rounded-lg text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center justify-center w-7 h-7"
          title="Redo"
        >
          ↪
        </button>

        <span class="w-px h-4 bg-gray-300 dark:bg-gray-700 mx-0.5"></span>

        <!-- Toggle Fullscreen Button -->
        <button
          type="button"
          @click="toggleFullscreen"
          :class="[
            'p-1.5 rounded-lg text-xs transition flex items-center justify-center gap-1 h-7 px-2 font-medium',
            isFullscreen
              ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
          :title="isFullscreen ? 'Exit Fullscreen (Esc)' : 'Toggle Fullscreen Editor'"
        >
          <!-- Minimize Icon -->
          <svg v-if="isFullscreen" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9L4 4m0 0l5 0m-5 0l0 5m6 6l5 5m0 0l-5 0m5 0l0-5"/>
          </svg>
          <!-- Maximize Icon -->
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
          </svg>
          <span class="text-[11px] hidden sm:inline">{{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}</span>
        </button>
      </div>
    </div>

    <!-- Editable Editor Box -->
    <div :class="['relative', isFullscreen ? 'flex-1 flex flex-col overflow-hidden' : '']">
      <div
        ref="editorRef"
        contenteditable="true"
        @input="onInput"
        @keyup="checkActiveFormats"
        @mouseup="checkActiveFormats"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :style="isFullscreen ? {} : { minHeight: minHeight || '130px' }"
        :class="[
          'rich-text-content focus:outline-none overflow-y-auto leading-relaxed text-gray-900 dark:text-white',
          isFullscreen ? 'flex-1 p-6 text-sm max-h-none' : 'p-3 text-xs max-h-[300px]'
        ]"
      ></div>

      <!-- Placeholder overlay when empty -->
      <div
        v-if="isEmpty && !isFocused"
        @click="focusEditor"
        :class="[
          'absolute pointer-events-none select-none text-gray-400 dark:text-gray-500',
          isFullscreen ? 'top-6 left-6 right-6 text-sm' : 'top-3 left-3 right-3 text-xs'
        ]"
      >
        {{ placeholder || 'Add key milestones, project highlights, or qualitative context to guide the AI synthesis...' }}
      </div>
    </div>

    <!-- Footer Meta -->
    <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200/70 dark:border-gray-700/70 bg-gray-100/50 dark:bg-gray-800/50 text-[11px] text-gray-500 dark:text-gray-400">
      <div class="flex items-center gap-3">
        <span class="font-medium">Rich Text Mode</span>
        <span class="w-1 h-1 rounded-full bg-emerald-500 inline-block"></span>
        <span>{{ wordCount }} words</span>
        <span>•</span>
        <span>{{ charCount }} characters</span>
        <span v-if="isFullscreen" class="text-indigo-600 dark:text-indigo-400 font-semibold hidden md:inline">
          (Press ESC or click Exit Fullscreen to close)
        </span>
      </div>

      <div class="flex items-center gap-3">
        <button
          v-if="!isEmpty"
          type="button"
          @click="clearContent"
          class="text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition"
        >
          Clear Notes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
  minHeight?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)
const isFocused = ref(false)
const isFullscreen = ref(false)
const currentBlock = ref('p')
const showTemplates = ref(false)

const activeFormats = ref({
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
  insertUnorderedList: false,
  insertOrderedList: false,
  blockquote: false,
  pre: false
})

const noteTemplates = [
  {
    label: '🎯 Performance Highlights',
    html: '<h3><strong>Key Performance Highlights</strong></h3><ul><li>Delivered major roadmap milestone ahead of schedule with high focus index.</li><li>Demonstrated top-tier problem-solving velocity during complex debugging sessions.</li></ul>'
  },
  {
    label: '🚀 Growth & Focus Areas',
    html: '<h3><strong>Growth & Focus Areas</strong></h3><ul><li>Implement structured 2-hour zero-meeting focus blocks daily.</li><li>Delegate code triage to mitigate sustained high cognitive load.</li></ul>'
  },
  {
    label: '💼 Executive Summary',
    html: '<h3><strong>Manager Executive Notes</strong></h3><p>Demonstrates outstanding overall technical capability and cross-functional leadership while maintaining strong collaboration efficiency.</p>'
  }
]

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})

function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false
  }
}

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
  if (isFullscreen.value) {
    setTimeout(focusEditor, 50)
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (editorRef.value && editorRef.value.innerHTML !== (newVal || '')) {
      editorRef.value.innerHTML = newVal || ''
    }
  }
)

const isEmpty = computed(() => {
  if (!editorRef.value) return true
  const text = editorRef.value.innerText.trim()
  return text.length === 0
})

const wordCount = computed(() => {
  if (!editorRef.value) return 0
  const text = editorRef.value.innerText.trim()
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
})

const charCount = computed(() => {
  if (!editorRef.value) return 0
  return editorRef.value.innerText.trim().length
})

function focusEditor() {
  if (editorRef.value) {
    editorRef.value.focus()
  }
}

function onInput() {
  if (editorRef.value) {
    const html = editorRef.value.innerHTML
    emit('update:modelValue', html)
    checkActiveFormats()
  }
}

function exec(command: string, value: string | undefined = undefined) {
  focusEditor()
  document.execCommand(command, false, value)
  onInput()
}

function execBlock(tagName: string) {
  focusEditor()
  document.execCommand('formatBlock', false, `<${tagName}>`)
  onInput()
}

function applyHeading() {
  execBlock(currentBlock.value)
}

function insertLink() {
  const url = prompt('Enter URL (e.g. https://example.com):', 'https://')
  if (url && url !== 'https://') {
    exec('createLink', url)
  }
}

function insertTemplate(html: string) {
  focusEditor()
  if (editorRef.value) {
    if (isEmpty.value) {
      editorRef.value.innerHTML = html
    } else {
      editorRef.value.innerHTML += `<br/>${html}`
    }
    onInput()
  }
  showTemplates.value = false
}

function clearContent() {
  if (editorRef.value) {
    editorRef.value.innerHTML = ''
    onInput()
  }
}

function checkActiveFormats() {
  try {
    activeFormats.value.bold = document.queryCommandState('bold')
    activeFormats.value.italic = document.queryCommandState('italic')
    activeFormats.value.underline = document.queryCommandState('underline')
    activeFormats.value.strikeThrough = document.queryCommandState('strikeThrough')
    activeFormats.value.insertUnorderedList = document.queryCommandState('insertUnorderedList')
    activeFormats.value.insertOrderedList = document.queryCommandState('insertOrderedList')
  } catch (e) {
    // queryCommandState edge cases
  }
}
</script>

<style scoped>
.rich-text-content :deep(h1) {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.rich-text-content :deep(h2) {
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.rich-text-content :deep(h3) {
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0.35rem;
  margin-bottom: 0.2rem;
}

.rich-text-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.rich-text-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.rich-text-content :deep(blockquote) {
  border-left: 3px solid #6366f1;
  padding-left: 0.75rem;
  font-style: italic;
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
  opacity: 0.9;
}

.rich-text-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.06);
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.8rem;
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
}

.dark .rich-text-content :deep(pre) {
  background-color: rgba(255, 255, 255, 0.08);
}

.rich-text-content :deep(a) {
  color: #6366f1;
  text-decoration: underline;
}
</style>
