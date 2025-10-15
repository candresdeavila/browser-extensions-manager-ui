import { renderHeader } from '../header/header.js'
import { renderContent } from '../content/content.js'

export function renderLayout(root) {
  root.innerHTML = `
    <div class="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header id="header"></header>
      <main id="content"></main>
    </div>
  `

  renderHeader(document.querySelector('#header'))
  renderContent(document.querySelector('#content'))
}
