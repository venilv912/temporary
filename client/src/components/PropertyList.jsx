import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyList = ({ properties }) => (
  <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
    <h2 className='text-2xl font-semibold' style={{ textAlign: 'center', marginBottom: '2rem', color: '#2d9c2d'}}>Featured Properties</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
      {properties && properties.length > 0 ? (
        properties.slice().reverse().map((property) => <PropertyCard key={property._id} property={property} />)
      ) : (
        <p style={{ textAlign: 'center' }}>No properties found. Please try searching again.</p>
      )}
    </div>
  </div>
);

export default PropertyList;
