import React, { useState } from 'react';
import './Transaction.css';

const Transaction = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    name: "Modern Villa",
    location: "Beverly Hills, Los Angeles",
    price: "$2,500,000",
    modeOfPayment: "Bank Transfer",
    owner: {
      name: "John Doe",
      contact: "+1 234 567 890",
      email: "john.doe@example.com",
    },
  });

  const [selectedPaymentMode, setSelectedPaymentMode] = useState(""); // Manage selected payment mode

  const handlePaymentChange = (event) => {
    setSelectedPaymentMode(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedPaymentMode) {
      // Redirect to the new page
      window.location.href = '/confirmation';
    }
  };

  return (
    <div className={`transaction-page`}>
    <main className='Tra'>
      <div className="transaction-container">
        <h1 className="page-title "><strong>Property Transaction Details</strong></h1>
        <div id='duaaa'></div>
        <div id='op'>
          <div className="property-details">
            <h2 className="section-title lol">Property Details</h2>
            <p><strong>Name:</strong> {propertyDetails.name}</p>
            <p><strong>Location:</strong> {propertyDetails.location}</p>
            <p><strong>Price:</strong> {propertyDetails.price}</p>
          </div>

          <div className="payment-details">
            <h2 className="section-title lol">Payment Information</h2>
            <p><strong>Amount Due:</strong> {propertyDetails.price}</p>
            <label className='tup'>Mode of Payment :</label>
            <select value={selectedPaymentMode} onChange={handlePaymentChange}>
              <option value="">Select</option>
              <option className="opt" value="Internet Banking">Internet Banking</option>
              <option className="opt" value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="owner-details">
            <h2 className="section-title lol">Owner / Seller Information</h2>
            <p><strong>Name:</strong> {propertyDetails.owner.name}</p>
            <p><strong>Contact:</strong> {propertyDetails.owner.contact}</p>
            <p><strong>Email:</strong> {propertyDetails.owner.email}</p>
          </div>

          <div className="ImageH"></div>
        </div>
      </div>
      <div className='studs flex justify-center'>
                {/* Confirmation Button */}
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={!selectedPaymentMode} // Disable button if no payment mode is selected
          >
            Confirm Transaction
          </button>
          </div>
    </main>
    </div>
  );
};

export default Transaction;
