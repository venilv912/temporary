import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Transaction from './pages/Transaction'
import CreateListing from './pages/CreateListing'
import MyListings from './pages/MyListings'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'

export default function App() {
  return <BrowserRouter>
  <Header />
  <div className="pt-16"> {/* Adjust this padding to match the height of your fixed header */}
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/about-us" element={<AboutUs />} />
    <Route path="/listing/:listingId" element={<Listing />} />
    <Route element={<PrivateRoute />} >
      <Route path="/transaction/:buyerId/:sellerId/:listingId" element={<Transaction />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/my-listings" element={<MyListings />} />
      <Route path="/update-listing/:listingId" element={<UpdateListing />} />
    </Route>
  </Routes>
  </div>
  </BrowserRouter>
}
