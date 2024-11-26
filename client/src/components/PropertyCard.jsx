import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
    <Link to={`/listing/${property._id}`}><img src={property.imageUrls[0]} alt={property.id} style={{ width: '100%', height: '200px', objectFit: 'cover' }} /></Link>
    <div style={{ padding: '1rem' }}>
      <div className='flex justify-between'>
        <h3>{property.name}</h3>
        <span style={{ fontWeight: 'bold', color: '#28a745' }}>For {((property.type==='sale')?'Sale':'Rent')}</span>
      </div>
      <p>{property.city}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
        <span style={{ fontWeight: 'bold', color: '#28a745' }}>₹ {property.price}</span>
        <Link to={`/listing/${property._id}`} className='rounded-md' style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default PropertyCard;
