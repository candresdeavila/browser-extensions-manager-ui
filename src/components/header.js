export function renderHeader(root) {
  root.innerHTML = `
    <div class="flex items-center justify-between border border-slate-200 rounded-3xl px-6 py-4 shadow-sm !bg-red-200">
      <!-- Logo + Title -->
      <div class="flex items-center gap-3">
        <img src="./logo.svg" alt="Logo" class="w-6 h-6" />
      </div>

      <!-- Dark mode toggle -->
      <button 
        id="darkModeToggle" 
        class="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
      >
        🌙
      </button>
    </div>
  `

  // Dark mode toggle logic
  const toggleBtn = root.querySelector('#darkModeToggle')
  toggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
  })
}
