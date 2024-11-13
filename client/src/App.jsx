import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Sign from './pages/Sign';
import Profile from './pages/Profile';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign' element={<Sign />} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/about' element={<About />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
  </Routes>
  </BrowserRouter>
}
