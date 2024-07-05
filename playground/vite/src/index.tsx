/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'
import '@unocss/reset/tailwind.css'
import 'uno.css'

const root = document.getElementById('root')

render(() => <App />, root!)
