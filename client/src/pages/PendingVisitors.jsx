import React, { useEffect, useState } from 'react';
import './VisitSlots.css';
import { useSelector } from 'react-redux';

const PendingVisitors = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPendingVisitors, setUserPendingVisitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVisitSlots = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/user/pending-visitors/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setError(true);
        return;
      }
      setUserPendingVisitors(data);
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
      <h2 className="font-semibold text-2xl text-center mb-4" style={{color: '#2d9c2d'}}>Pending Visitors</h2>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Error showing Pending Visitors</p>}
      {userPendingVisitors && userPendingVisitors.length === 0 && (
        <div className='text-gray-700 text-center font-semibold' style={{padding: 225}}>No Pending Visitors</div>
      )}
      {userPendingVisitors && !loading && !error && (
        <div className="bookedslots-container">
          {userPendingVisitors.map((pendingVisitor) => (
            <div key={pendingVisitor._id} className="bookedslots-card">
              <img src={pendingVisitor.image} alt={pendingVisitor.name} className="bookedslots-image" />
              <div className="bookedslots-details">
                <h2>{pendingVisitor.name}</h2>
                <p>Buyer: {pendingVisitor.buyerName}</p>
                <p>Date: {pendingVisitor.date}</p>
                <p>Time: {pendingVisitor.visitSlot}</p>
              </div>
              <div className="bookedslots-actions">
                <span
                  className={`bookedslots-status ${
                    pendingVisitor.status
                  }`}
                >
                  {((pendingVisitor.status==='visited')?('Visited'):((pendingVisitor.status==='pending')?('Pending'):('Cancelled')))}
                </span>
                {pendingVisitor.status === 'pending' && (
                  <button
                    className="bookedslots-visited-button"
                  >
                    Mark as Visited
                  </button>
                )}
                {pendingVisitor.status === 'pending' && (
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

export default PendingVisitors;
