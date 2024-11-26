import React, { useEffect, useState } from 'react';
import './VisitSlots.css';
import { useSelector } from 'react-redux';

const VisitSlots = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userVisitSlots, setUserVisitSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
  
  return (
    <div className="bookedslots">
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Booked Slots</h2>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Error showing Booked Slots</p>}
      {userVisitSlots && userVisitSlots.length === 0 && (
        <div className='text-gray-700 text-center font-semibold' style={{padding: 225}}>No Appointments Booked</div>
      )}
      {userVisitSlots && !loading && !error && (
        <div className="bookedslots-container">
          {userVisitSlots.map((visitSlot) => (
            <div key={visitSlot._id} className="bookedslots-card">
              <img src={visitSlot.image} alt={visitSlot.name} className="bookedslots-image" />
              <div className="bookedslots-details">
                <h2>{visitSlot.name}</h2>
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
