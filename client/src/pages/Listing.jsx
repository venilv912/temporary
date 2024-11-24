import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import pop from './photos.js';
import { useParams } from 'react-router-dom';
import furnishedIcon from '../assets/furnished-icon.png';
import parkingIcon from '../assets/parking-icon.png';
import locationIcon from '../assets/location-icon.png';
import gardenIcon from '../assets/garden-icon.png';
import gymIcon from '../assets/gym-icon.png';

const Listing = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (listing ? (prevIndex === 0 ? listing.imageUrls.length - 1 : prevIndex - 1): 0));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (listing ? (prevIndex === listing.imageUrls.length - 1 ? 0 : prevIndex + 1): 0));
  };
  
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async() => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false)
        {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
      } catch(error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  const styles = {
    container: {
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    heroSection: {
      width: '100%',
      height: '500px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center',
      overflow: 'hidden',
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    navigationButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      cursor: 'pointer',
      zIndex: 2,
    },
    prevButton: {
      left: '10px',
    },
    nextButton: {
      right: '10px',
    },
    navigationDots: {
      position: 'absolute',
      bottom: '10px',
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: '#16a34a',
      opacity: 0.5,
      cursor: 'pointer',
    },
    activeDot: {
      opacity: 1,
    },
    contentSection: {
      padding: '32px',
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    headerSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '24px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      marginTop: '0',
    },
    address: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '8px',
    },
    wishlistButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: isWishlisted ? '#16a34a' : 'white',
      color: isWishlisted ? 'white' : '#16a34a',
      border: isWishlisted ? 'none' : '2px solid #16a34a',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginBottom: '32px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    statLabel: {
      color: '#666',
      marginBottom: '4px',
      fontSize: '16px',
    },
    statValue: {
      color: '#16a34a',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0',
    },
    descriptionCard: {
      backgroundColor: 'white',
      padding: '32px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    descriptionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '16px',
    },
    descriptionText: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      marginTop: '24px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    featureDot1: {
      width: '12px',
      height: '12px',
      backgroundColor: (listing ? (listing.furnished ? '#16a34a': 'Red') : 'Gray'), 
      borderRadius: '50%',
    },
       featureDot2: {
      width: '12px',
      height: '12px',
      backgroundColor:(listing ? (listing.gym ? '#16a34a': 'Red') : 'Gray'),
      borderRadius: '50%',
    },
       featureDot3: {
      width: '12px',
      height: '12px',
      backgroundColor:(listing ? (listing.parking ? '#16a34a': 'Red') : 'Gray'),
      borderRadius: '50%',
    },
       featureDot4: {
      width: '12px',
      height: '12px',
      backgroundColor:(listing ? (listing.garden ? '#16a34a': 'Red') : 'Gray'),
      borderRadius: '50%',
    },

    featureText: {
      color: '#666',
    },
    carouselContainer: {
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  carouselImages: {
      display: 'flex',
      transition: 'transform 0.5s ease-in-out',
      transform: `translateX(-${currentIndex * 100}%)`,
      width: `${(listing? listing.imageUrls.length: 1) * 100}%`,
  },
  carouselImage: {
          width: '100%',
          height: '500px',
          objectFit: 'cover',
          flexShrink: 0,
        },
  };


  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl font-semibold text-gray-700'>Something went Wrong!</p>}
      {listing && !loading && !error && (
        <div style={styles.container}>

      <div style={styles.heroSection}>
  {listing.imageUrls.length > 1 && <button
    style={{ ...styles.navigationButton, ...styles.prevButton }}
    onClick={goToPrevious}
  >
    &#10094;
  </button>}

  <div style={styles.carouselImages}>
    {listing.imageUrls.map((url, index) => (
      <img
      className='h-[50px]'
        key={index}
        src={url}
        alt={`Slide ${index + 1}`}
        style={styles.carouselImage}
      />
    ))}
  </div>
  {listing.imageUrls.length>1 && <button
    style={{ ...styles.navigationButton, ...styles.nextButton }}
    onClick={goToNext}
  >
    &#10095;
  </button>}
  <div style={styles.navigationDots}>
    {listing.imageUrls.map((_, index) => (
      <div
        key={index}
        style={{
          ...styles.dot,
          ...(index === currentIndex ? styles.activeDot : {}),
        }}
        onClick={() => setCurrentIndex(index)}
        ></div>
      ))}
  </div>
</div>



      <div style={styles.contentSection}>
        <div style={styles.contentWrapper}>

          <div style={styles.headerSection}>
            <div>
              <h1 style={styles.title}>{listing.name}</h1>
              <p style={styles.address}>{listing.address}</p>
            </div>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              style={styles.wishlistButton}
            >
              <Heart
                color={isWishlisted ? 'white' : '#16a34a'}
                fill={isWishlisted ? 'white' : 'none'}
                size={20}
                />
              {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
          </div>


          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Price</p>
              <p style={styles.statValue}>₹ {listing.price} {listing.type==='rent'? '/month': ''}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>Bedrooms</p>
              <p style={styles.statValue}>{listing.bedrooms}</p>
            </div>
            <div style={styles.statCard}>
              <p style={styles.statLabel}>For</p>
              <p style={styles.statValue}>{listing.type==='sale' ? 'Sale': 'Rent'}</p>
            </div>
          </div>


          <div style={styles.descriptionCard}>
            <h2 style={styles.descriptionTitle}>Property Description</h2>
            <p style={styles.descriptionText}>{listing.description}</p>
            <div style={styles.featuresGrid}>
              <div style={styles.featureItem}>
                <div style={styles.featureDot1}></div>
                <img src={furnishedIcon} className='h-5' alt="furnished icon" />
                <span style={styles.featureText}>Furnished</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot2}></div>
                <img src={gymIcon} className='h-6' alt="gym icon" />
                <span style={styles.featureText}>Gym</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot3}></div>
                <img src={parkingIcon} className='h-6' alt="parking icon" />
                <span style={styles.featureText}>Parking</span>
              </div>
              <div style={styles.featureItem}>
                <div style={styles.featureDot4}></div>
                <img src={gardenIcon} className='h-6' alt="garden icon" />
                <span style={styles.featureText}>Garden</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )}
    </main>
  );
};

export default Listing;