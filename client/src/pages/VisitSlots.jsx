import React, { useEffect, useState } from 'react';
import './VisitSlots.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const VisitSlots = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userVisitSlots, setUserVisitSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    const fetchVisitSlots = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/user/visit-slots/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        return;
      }
      setUserVisitSlots(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

    fetchVisitSlots();
  }, [currentUser]);
  
  const handleCancelClick = async (visitSlot) => {
    try {
      setStatusLoading(true);
      setStatusError(false);
      const res = await fetch(`/api/user/update-visit-slot/${visitSlot}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'cancelled'
        }),
      });
      const data = await res.json();
      setStatusLoading(false);
      if (data.success === false)
      {
        setStatusError(data.message);
      }
      setUserVisitSlots(prevState =>
        prevState.map((slot) => 
          slot._id === visitSlot 
          ? { ...slot, status: 'cancelled'}
          : slot
        )
      );
    } catch (error) {
      setStatusError(error.message);
      setStatusLoading(false);
    };
  }

  return (
    <div className="bookedslots">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Booked Slots</h2>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Error showing Booked Slots</p>}
      {userVisitSlots && userVisitSlots.length === 0 && (
        <div className='text-gray-700 text-center font-semibold' style={{padding: 225}}>No Appointments Booked</div>
      )}
      {statusError && <p className='text-center text-red-700 mb-3'>{statusError}</p>}
      {userVisitSlots && !loading && !error && (
        <div className="bookedslots-container">
          {userVisitSlots.slice().reverse().map((visitSlot) => (
            <div key={visitSlot._id} className="bookedslots-card">
              <Link to={`/listing/${visitSlot.listingId}`}><img src={visitSlot.image} alt={visitSlot.name} className="bookedslots-image" /></Link>
              <div className="bookedslots-details">
                <h2>{visitSlot.name}</h2>
                <p>Contact: {visitSlot.sellerContact}</p>
                <p>Date: {visitSlot.date}</p>
                <p>Time: {visitSlot.visitSlot}</p>
              </div>
              <div className="bookedslots-actions">
                <span
                  className={`bookedslots-status ${
                    visitSlot.status
                  }`}
                >
                  {((visitSlot.status==='visited')?('Visited'):((visitSlot.status==='pending')?('Pending'):('Cancelled')))}
                </span>
                {visitSlot.status === 'pending' && (
                  <button
                    disabled={statusLoading}
                    onClick={()=>handleCancelClick(visitSlot._id)}
                    className="bookedslots-cancel-button"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisitSlots;
