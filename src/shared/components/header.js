import { toggleDarkMode } from '../utils/darkmode.js'

export function renderHeader(root) {
  root.innerHTML = `
    <div class="w-[70%] max-w-6xl mx-auto 
                flex items-center justify-between
                bg-white dark:bg-gray-800 
                rounded-3xl shadow-sm 
                px-6 py-3 mt-8 h-16">
      <!-- Logo + Title -->
      <div class="flex items-center">
        <img src="./logo.svg" alt="Logo" class="w-13 h-13"/>
      </div>

      <!-- Dark mode toggle -->
      <button 
        id="darkModeToggle" 
        class="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
        🌙
      </button>
    </div>
  `

  // Dark mode toggle logic
  const toggleBtn = root.querySelector('#darkModeToggle')
  toggleBtn.addEventListener('click', toggleDarkMode)
}
