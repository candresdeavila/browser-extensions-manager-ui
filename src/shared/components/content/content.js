// src/shared/components/content.js
import extensions from '../../../data/extensions.json'
import { renderCard } from '../card/card.js'          

const STORAGE_KEY = 'extensions_state_v1'
const FILTER_STORAGE_KEY = 'current_filter_state'

export function renderContent(root) {
  root.innerHTML = `
    <div class="max-w-6xl mx-auto w-[90%] md:w-[70%] mt-10 mb-10">
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Extension List
        </h2>

        <!-- Filter buttons -->
        <div class="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          <button class="filter-btn px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base min-w-[80px]" data-filter="all">All</button>
          <button class="filter-btn px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base min-w-[80px]" data-filter="active">Active</button>
          <button class="filter-btn px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base min-w-[80px]" data-filter="inactive">Inactive</button>
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
  let currentFilter = loadFilterState()
  let searchTerm = '' // <-- nuevo estado para búsqueda

  const grid = root.querySelector('#extensionsGrid')
  const filterBtns = root.querySelectorAll('.filter-btn')

  // Estilos iniciales de botones
  updateFilterButtonStyles()

  // Función para cargar el estado del filtro
  function loadFilterState() {
    try {
      const savedFilter = localStorage.getItem(FILTER_STORAGE_KEY)
      return savedFilter || 'all'
    } catch (err) {
      console.warn('Could not load filter state', err)
      return 'all'
    }
  }

  // Función para guardar el estado del filtro
  function saveFilterState(filter) {
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, filter)
    } catch (err) {
      console.warn('Could not save filter state', err)
    }
  }

  // --- Helpers
  function getFiltered() {
    // Asegurarse de que tenemos los datos más recientes del localStorage
    const currentItems = loadState();
    
    // 1) aplica filtro por active/inactive
    let list = []
    if (currentFilter === 'all') {
      list = currentItems;
    } else if (currentFilter === 'active') {
      list = currentItems.filter(i => i.active);
    } else {
      list = currentItems.filter(i => !i.active);
    }

    // 2) aplica filtro por término de búsqueda (si existe)
    if (searchTerm && searchTerm.length > 0) {
      const q = searchTerm.toLowerCase()
      list = list.filter(i => {
        return i.name.toLowerCase().includes(q)
      })
    }

    return list;
  }

// listener global para recibir eventos de búsqueda desde header
window.addEventListener('search', (e) => {
  searchTerm = (e && e.detail) ? String(e.detail).trim() : ''
  // si quieres, resetea al filtro 'all' cuando se busque:
  // currentFilter = 'all'
  renderGrid()
})

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
      saveFilterState(currentFilter) // Guardar el estado del filtro
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
    
    // Actualizar el estado del item
    item.active = e.target.checked
    
    // Guardar el estado actualizado
    saveState()
    
    // Si estamos en una vista filtrada, puede que necesitemos re-renderizar
    // para mantener la consistencia con el filtro actual
    if (currentFilter !== 'all') {
      // Si el item ya no cumple con el filtro actual, debemos re-renderizar
      const shouldBeVisible = 
        (currentFilter === 'active' && item.active) ||
        (currentFilter === 'inactive' && !item.active);
        
      if (!shouldBeVisible) {
        setTimeout(() => renderGrid(), 100); // Pequeño delay para una mejor UX
      }
    } else {
      renderGrid();
    }
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
