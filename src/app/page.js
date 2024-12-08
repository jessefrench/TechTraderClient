'use client';

import { useEffect, useState } from 'react';
import { getAllListings } from '../api/listingData';
import ListingCard from '../components/cards/ListingCard';
import ListingFilter from '../components/ListingFilter';

export default function Home() {
  const [listings, setListings] = useState([]);

  const getListings = () => {
    getAllListings().then(setListings);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 p-4">
        <ListingFilter />
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} onUpdate={getListings} />
          ))}
        </div>
      </div>
    </div>
  );
}
