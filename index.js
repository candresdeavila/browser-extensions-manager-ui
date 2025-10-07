import './src/index.css'

import { renderLayout } from './src/shared/components/layaout.js'
import { initializeDarkMode } from './src/shared/utils/darkmode.js'

// Initialize dark mode before rendering
initializeDarkMode()

// Obtén el contenedor raíz
const app = document.querySelector('#app')

// Renderiza la estructura principal
renderLayout(app)
