// src/shared/components/content.js
import { extensions } from '../../data/extensionsData.js'   // ajusta si tu data está en otra carpeta
import { renderCard } from '../../screens/card.js'          // ajusta si card.js está en otra ruta

const STORAGE_KEY = 'extensions_state_v1'

export function renderContent(root) {
  root.innerHTML = `
    <div class="max-w-6xl mx-auto w-[70%] mt-10 mb-10">
      <div class="flex justify-between items-center mb-6">
        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Extension List
        </h2>

        <!-- Filter buttons -->
        <div class="flex gap-3">
          <button class="filter-btn px-4 py-2 rounded-full" data-filter="all">All</button>
          <button class="filter-btn px-4 py-2 rounded-full" data-filter="active">Active</button>
          <button class="filter-btn px-4 py-2 rounded-full" data-filter="inactive">Inactive</button>
        </div>
      </div>

      <!-- Grid container -->
      <div id="extensionsGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Aquí inyectaremos las tarjetas -->
      </div>
    </div>
  `

  // --- State
  let items = loadState()
  let currentFilter = 'all'

  const grid = root.querySelector('#extensionsGrid')
  const filterBtns = root.querySelectorAll('.filter-btn')

  // Estilos iniciales de botones
  updateFilterButtonStyles()

  // --- Helpers
  function getFiltered() {
    if (currentFilter === 'all') return items
    if (currentFilter === 'active') return items.filter(i => i.active)
    return items.filter(i => !i.active)
  }

  function renderGrid() {
    const list = getFiltered()
    if (!list.length) {
      grid.innerHTML = `<p class="text-slate-500">No extensions found.</p>`
      return
    }
    grid.innerHTML = list.map(ext => renderCard(ext)).join('')
  }

  renderGrid()

  // --- Eventos filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter
      updateFilterButtonStyles()
      renderGrid()
    })
  })

  function updateFilterButtonStyles() {
    filterBtns.forEach(b => {
      if (b.dataset.filter === currentFilter) {
        b.classList.add('bg-blue-500', 'text-white')
        b.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'dark:text-gray-200')
      } else {
        b.classList.remove('bg-blue-500', 'text-white')
        b.classList.add('bg-gray-200', 'dark:bg-gray-700', 'dark:text-gray-200')
      }
    })
  }

  // --- Delegación de eventos en grid
  grid.addEventListener('click', (e) => {
    const removeBtn = e.target.closest('.remove-btn')
    if (removeBtn) {
      const article = removeBtn.closest('article')
      if (!article) return
      const id = Number(article.dataset.id)
      items = items.filter(i => i.id !== id)
      saveState()
      renderGrid()
      return
    }
  })

  grid.addEventListener('change', (e) => {
    if (!e.target.matches('.toggle')) return
    const id = Number(e.target.dataset.id)
    const item = items.find(i => i.id === id)
    if (!item) return
    item.active = e.target.checked
    saveState()
    renderGrid()
  })

  // --- Persistencia
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return JSON.parse(raw)
    } catch (err) {
      console.warn('Could not parse saved state', err)
    }
    return JSON.parse(JSON.stringify(extensions))
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.warn('Could not save state', err)
    }
  }
}
