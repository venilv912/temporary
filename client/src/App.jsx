import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'

export default function App() {
  return <BrowserRouter>
  <Header />
  <div className="pt-16"> {/* Adjust this padding to match the height of your fixed header */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/about" element={<About />} />
  </Routes>
  </div>
  </BrowserRouter>
}
