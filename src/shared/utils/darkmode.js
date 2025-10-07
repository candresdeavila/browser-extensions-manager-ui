// Manage dark mode state and persistence
const DARK_MODE_KEY = 'darkMode'

export function initializeDarkMode() {
  // Check if user has a saved preference
  const darkMode = localStorage.getItem(DARK_MODE_KEY)
  
  if (darkMode === 'true') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function toggleDarkMode() {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem(DARK_MODE_KEY, isDark)
  
  // Update moon/sun icon
  const toggleButton = document.querySelector('#darkModeToggle')
  if (toggleButton) {
    toggleButton.innerHTML = isDark ? '☀️' : '🌙'
  }
}
