import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./MyListings.css";

import furnishedIcon from '../assets/furnished-icon.png';
import parkingIcon from '../assets/parking-icon.png';
import noParkingIcon from '../assets/noparking-icon.png';
import locationIcon from '../assets/location-icon.png';

export default function MyListings() {
  const { currentUser } = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(userListings);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          return;
        }
        setUserListings(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentUser]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false)
      {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Manage_Listings">
      <h2 className="font-semibold text-2xl">My Properties</h2>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Error showing Properties</p>}
      {userListings && (userListings.length < 1) &&
        <div className='text-gray-700 font-semibold' style={{padding: 225}}>No Properties to Display</div>
      }
      <div className="properties-grid">
        {userListings && userListings.length>0 &&
          userListings.map((listing) => (
            <div key={listing._id} className="property-card">
            <Link to={`/listing/${listing._id}`}>
            <div
              className="property-image"
              style={{
                backgroundImage: `url(${listing.imageUrls[0]})`,
              }}
              ></div>
              </Link>
            <Link to={`/listing/${listing._id}`}><h3 className='font-semibold'>{listing.name}</h3></Link>
            <p className="price">₹ {listing.price}</p>
             <div className="location details">
              <span>
                <img
                  src={locationIcon}
                  alt="Location"
                  className="icon"
                  />
                {listing.city}
              </span>
            </div>
            <div className="details">
              <span>
                <img
                  src={furnishedIcon}
                  alt="Bedroom"
                  className="icon bedroom"
                  />
                {listing.bedrooms}
              </span>
              <span>
                <img
                  src={listing.parking ? parkingIcon : noParkingIcon}
                  alt="Parking"
                  className="icon"
                  />
              </span>
            </div>
            <div className="buttons">
              <Link to={`/update-listing/${listing._id}`} className="edit-btn"><button>Edit</button></Link>
              <hr className="button-separator" />
              <button onClick={()=>handleListingDelete(listing._id)} className="delete-btn">Delete</button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  );
};