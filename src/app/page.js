'use client';

import { useEffect, useState } from 'react';
import { getAllListings } from '../api/listingData';
import ListingCard from '../components/cards/ListingCard';

export default function Home() {
  const [listings, setListings] = useState([]);

  const getListings = () => {
    getAllListings().then(setListings);
  };

  useEffect(() => {
    getListings();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} onUpdate={getListings} />
        ))}
      </div>
    </div>
  );
}
