import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Plan from './pages/Plan'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo/:categoria" element={<Catalog />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App