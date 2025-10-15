export function renderCard(ext) {
  return `
    <article class="bg-white dark:bg-gray-800 border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between" data-id="${ext.id}">
      
      <!-- Top: Icon + Text -->
      <div class="flex items-start gap-4 mb-4">
        <img src="${ext.icon}" alt="${ext.name} icon" class="w-12 h-12 object-contain flex-shrink-0" />
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">${ext.name}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-300 mt-1">${ext.description}</p>
        </div>
      </div>

      <!-- Bottom: Actions -->
      <div class="flex items-center justify-between">
        <button class="remove-btn px-4 py-1 rounded-full border border-slate-300 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition">
          Remove
        </button>

        <!-- Switch -->
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" data-id="${ext.id}" ${ext.active ? 'checked' : ''} 
                 class="sr-only peer toggle" aria-checked="${ext.active ? 'true' : 'false'}" />
          <div class="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-rose-500 transition-colors duration-300 ease-in-out"></div>
          <span class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md 
                       transition-all duration-300 ease-in-out 
                       peer-checked:translate-x-5"></span>
        </label>
      </div>
    </article>
  `
}
