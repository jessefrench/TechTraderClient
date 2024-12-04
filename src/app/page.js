'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ListingCard from '../components/ListingCard';
import { getAllListings } from '../api/listingData';
import { checkUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState([]);

  const handleRegistration = () => {
    checkUser(user.uid).then((backendUser) => {
      console.warn('backend user response', backendUser);
      if (!backendUser) {
        router.push('/register');
      } else {
        router.push('/');
      }
    });
  };

  useEffect(() => {
    if (user.uid) {
      handleRegistration();
    }
  }, [user]);

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
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}
