import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Transaction from './pages/Transaction'
import CreateListing from './pages/CreateListing'

export default function App() {
  return <BrowserRouter>
  <Header />
  <div className="pt-16"> {/* Adjust this padding to match the height of your fixed header */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About />} />
    <Route path="/transaction" element={<Transaction />} />
    <Route element={<PrivateRoute />} >
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-listing" element={<CreateListing />} />
    </Route>
  </Routes>
  </div>
  </BrowserRouter>
}
