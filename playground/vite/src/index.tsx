/* @refresh reload */
import { render } from 'solid-js/web'

import App from './App'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

const root = document.getElementById('root')

render(() => <App />, root!)
