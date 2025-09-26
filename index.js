import './src/index.css'

import { renderLayout } from './src/shared/components/layaout.js'


// Obtén el contenedor raíz
const app = document.querySelector('#app')

// Renderiza la estructura principal
renderLayout(app)
