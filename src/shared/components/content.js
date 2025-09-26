export function renderContent(root) {
  root.innerHTML = `
    <div class="max-w-6xl mx-auto w-[70%] mt-10 mb-10">
      <div class="flex justify-between items-center mb-6">
        <!-- Title -->
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Extension List
        </h2>

        <!-- Filter buttons -->
        <div class="flex gap-3 mb-6">
          <button class="filter-btn bg-blue-500 text-white px-4 py-2 rounded">All</button>
          <button class="filter-btn bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded">Active</button>
          <button class="filter-btn bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded">Inactive</button>
        </div>
      </div>
      <!-- Grid container -->
      <div id="extensionsGrid" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Aquí inyectaremos las tarjetas desde un JSON -->
      </div>
    </div>
  `
}
