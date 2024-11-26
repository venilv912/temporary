import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useParams } from "react-router-dom";

const Transaction = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [listing, setListing] = useState(null);
  const [listingError, setListingError] = useState(false);
  const [listingLoading, setListingLoading] = useState(true);
  const [buyer, setBuyer] = useState(null);
  const [buyerError, setBuyerError] = useState(false);
  const [buyerLoading, setBuyerLoading] = useState(true);
  const [seller, setSeller] = useState(null);
  const [sellerError, setSellerError] = useState(false);
  const [sellerLoading, setSellerLoading] = useState(true);
  const [transactionError, setTransactionError] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchTransaction = async() => {
      try {
        setTransactionError(false);
        setTransactionLoading(true);
        const res = await fetch(`/api/transaction/get/${params.buyerId}/${params.listingId}`);
        if (res.success === false)
        {
          setTransactionError(true);
          setTransactionLoading(false);
          return;
        }
        setTransactionError(false);
        setTransactionLoading(false);
        console.log(res);
        if (res.status !== 204)
        {
          const data = await res.json();
          setIsPaid(true);
          setTransactionId(data.transactionId);
        }
      } catch(error) {
        setTransactionError(true);
        setTransactionLoading(false);
      }
    };
  
    fetchTransaction();
  }, [params.buyerId]);

  useEffect(() => {
  const fetchListing = async() => {
    try {
      setListingError(false);
      setListingLoading(true);
      const res = await fetch(`/api/listing/get/${params.listingId}`);
      const data = await res.json();
      if (data.success === false)
      {
        setListingError(true);
        setListingLoading(false);
        return;
      }
      setListing(data);
      setListingError(false);
      setListingLoading(false);
    } catch(error) {
      setListingError(true);
      setListingLoading(false);
    }
  };

  fetchListing();
}, [params.listingId]);

useEffect(() => {
  const fetchBuyer = async() => {
    try {
      setBuyerError(false);
      setBuyerLoading(true);
      const res = await fetch(`/api/user/get/${params.buyerId}`);
      const data = await res.json();
      if (data.success === false)
      {
        setBuyerError(true);
        setBuyerLoading(false);
        return;
      }
      setBuyer(data);
      setBuyerError(false);
      setBuyerLoading(false);
    } catch(error) {
      setBuyerError(true);
      setBuyerLoading(false);
    }
  };

  fetchBuyer();
}, [params.buyerId]);

useEffect(() => {
  const fetchSeller = async() => {
    try {
      setSellerError(false);
      setSellerLoading(true);
      const res = await fetch(`/api/user/get/${params.sellerId}`);
      const data = await res.json();
      if (data.success === false)
      {
        setSellerError(true);
        setSellerLoading(false);
        return;
      }
      setSeller(data);
      setSellerError(false);
      setSellerLoading(false);
    } catch(error) {
      setSellerError(true);
      setSellerLoading(false);
    }
  }

  fetchSeller();
}, [params.sellerId]);

  const handlePayment = async () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: `${listing.tokenAmount*100}`, // Amount in smallest currency unit (50000 = ₹500)
      currency: "INR",
      name: "ReaL Estate",
      description: "Token Payment",
      image: "", // Optional logo URL
      handler: async function (response) {
        try {
          setLoading(true);
          setError(false);
          const res = await fetch('/api/transaction/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactionId: response.razorpay_payment_id,
              userId: params.buyerId,
              listingId: params.listingId,
              name: listing.name,
              image: listing.imageUrls[0],
              tokenAmount: listing.tokenAmount
            }),
          });
          const data = await res.json();
          setLoading(false);
          if (data.success === false)
          {
            setError(data.message);
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        };
        setTransactionId(response.razorpay_payment_id);
        setIsPaid(true);
        setShowConfetti(true); // Start confetti animation
        setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 3 seconds
      },
      prefill: {
        name: `${buyer.username}`,
        email: `${buyer.email}`,
        contact: `${buyer.mobile}`,
      },
      theme: {
        color: "#16a34a",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const styles = {
    container: {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "100px auto",
      padding: "20px",
      backgroundColor: "#f9fafb",
      borderRadius: "12px",
      position: "relative",
    },
    header: {
      textAlign: "center",
      backgroundColor: "#16a34a",
      color: "white",
      padding: "15px",
      borderRadius: "8px 8px 0 0",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    content: {
      marginBottom: "20px",
      fontSize: "16px",
      color: "#4b5563",
    },
    field: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      marginBottom: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    label: {
      fontWeight: "bold",
      color: "#374151",
    },
    value: {
      color: "#6b7280",
    },
    buttonContainer: {
      textAlign: "center",
      marginTop: "20px",
    },
    button: {
      padding: "12px 24px",
      fontSize: "18px",
      backgroundColor: "#16a34a",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
    },
    buttonDisabled: {
      backgroundColor: "#d1d5db",
      cursor: "not-allowed",
    },
  };

  return (
    <main>
    {(listingLoading || buyerLoading || sellerLoading || transactionLoading) && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
    {(listingError || buyerError || sellerError || transactionError) && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Something went Wrong!</p>}
    {listing && buyer && seller && !listingLoading && !buyerLoading && !sellerLoading && !transactionLoading && !listingError && !buyerError && !sellerError && !transactionError && (
      <div>
      {showConfetti && <Confetti numberOfPieces={200} />}
    <div style={styles.container}>
      <div style={styles.header}>Real Estate Bills</div>
      <div style={styles.content}>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Are you sure you want to continue with this token payment, <b>{buyer.username}</b>?
        </p>
        <div style={styles.field}>
          <span style={styles.label}>Seller:</span>
          <span style={styles.value}>{seller.username}</span>
        </div>
        <div style={styles.field}>
          <span style={styles.label}>Token Price:</span>
          <span style={styles.value}>₹{listing.tokenAmount}</span>
        </div>
        <div style={styles.field}>
          <span style={styles.label}>Property Name:</span>
          <span style={styles.value}>{listing.name}</span>
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <button
        className="mb-3 font-semibold"
          style={{
            ...styles.button,
            ...(isPaid ? styles.buttonDisabled : {}),
          }}
          onClick={handlePayment}
          disabled={isPaid}
        >
          {loading ? "Paying..." : (isPaid ? "Paid" : "Pay Now")}
        </button>
        {error && <p className="text-red-700 text-center">{error}</p>}
        {!error && transactionId && <p className='text-green-700 font-semibold'>Transaction ID: {transactionId}</p>}
      </div>
      </div>
    </div>
    )}
    </main>
  );
};

export default Transaction;
