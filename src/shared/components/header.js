// src/shared/components/header.js
import { toggleDarkMode } from '../utils/darkmode.js'

export function renderHeader(root) {
  root.innerHTML = `
    <div class="w-[70%] max-w-6xl mx-auto 
                flex items-center justify-between
                bg-white dark:bg-[hsl(227,70%,18%)]
                rounded-3xl shadow-sm 
                px-6 py-3 mt-8 h-16 transition-colors duration-500">
      
      <!-- Logo -->
      <div class="flex items-center">
        <img src="./logo.svg" alt="Logo" class="w-13 h-13"/>
      </div>

      <!-- Right controls: search + darkmode -->
      <div class="flex items-center gap-3">
        <!-- Search icon button -->
        <button id="searchToggle" class="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          🔍
        </button>

        <!-- Search input (hidden initially) -->
        <div id="searchWrapper" class="hidden">
          <input id="searchInput" type="text" placeholder="Search..." 
                 class="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none" text-white/>
          <button id="searchBtn" class="ml-2 px-3 py-1 rounded-lg bg-blue-500 text-white">Go</button>
        </div>

        <!-- Dark mode toggle -->
        <button 
          id="darkModeToggle" 
          aria-pressed="false"
          class="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          🌙
        </button>
      </div>
    </div>
  `

  // referencias DOM
  const toggleBtn = root.querySelector('#darkModeToggle')
  const searchToggle = root.querySelector('#searchToggle')
  const searchWrapper = root.querySelector('#searchWrapper')
  const searchInput = root.querySelector('#searchInput')
  const searchBtn = root.querySelector('#searchBtn')

  // init dark button
  function refreshButton() {
    const isDark = document.documentElement.classList.contains('dark')
    toggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false')
    toggleBtn.textContent = isDark ? '☀️' : '🌙'
  }
  toggleBtn.addEventListener('click', () => {
    toggleDarkMode()
    refreshButton()
  })
  refreshButton()

  // mostrar/ocultar input de búsqueda
  searchToggle.addEventListener('click', () => {
    const isHidden = searchWrapper.classList.contains('hidden')
    if (isHidden) {
      searchWrapper.classList.remove('hidden')
      searchInput.focus()
    } else {
      // si ya visible, lo ocultamos
      searchWrapper.classList.add('hidden')
      searchInput.value = ''
      // enviar evento para limpiar búsqueda
      window.dispatchEvent(new CustomEvent('search', { detail: '' }))
    }
  })

  // función que dispara la búsqueda (la puedes escribir tú mismo)
  function fireSearch() {
    const term = (searchInput.value || '').trim()
    window.dispatchEvent(new CustomEvent('search', { detail: term }))
  }

  // buscar al click del botón y al presionar Enter
  searchBtn.addEventListener('click', fireSearch)
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fireSearch()
  })
}
