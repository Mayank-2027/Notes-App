
import { createRoot } from 'react-dom/client'
import Contextprovider from "../context/Contextprovider.jsx"

import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <Contextprovider>
    <App />
  </Contextprovider>,
)
