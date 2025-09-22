import { renderHeader } from '../components/header.js'
import { renderContent } from '../components/content.js'

export function renderLayout(root) {
  root.innerHTML = `
    <div class="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <header id="header"></header>
      <main id="content" class="flex-1 p-6"></main>
    </div>
  `

  renderHeader(document.querySelector('#header'))
  renderContent(document.querySelector('#content'))
}
