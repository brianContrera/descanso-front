import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Plan from './pages/Plan'
import Confirmation from './pages/Confirmation'
import Memorial from './pages/Memorial'
import Tabbar from './components/Tabbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo/:categoria" element={<Catalog />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/confirmacion" element={<Confirmation />} />
        <Route path="/memorial" element={<Memorial />} />
      </Routes>
      <Tabbar />
    </BrowserRouter>
  )
}

export default App