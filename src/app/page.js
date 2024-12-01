'use client';

import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import getAllListings from '../api/listingData';

export default function Home() {
  const [listings, setListings] = useState([]);

  const getListings = () => {
    getAllListings().then(setListings);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row">
          {listings.map((listing) => (
            <div key={listing.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
