'use client';

import { useEffect, useState, useCallback } from 'react';
import { getAllListings } from '../api/listingData';
import { useAuth } from '../utils/context/authContext';
import ListingCard from '../components/cards/ListingCard';
import ListingFilter from '../components/ListingFilter';

export default function Home() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [currentUserCity, setCurrentUserCity] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    conditions: [],
    localOnly: false,
  });

  const fetchListings = () => {
    getAllListings().then((data) => {
      setListings(data);
      setFilteredListings(data);
    });
  };

  useEffect(() => {
    fetchListings();
    setCurrentUserCity(user.city);
  }, [user.city]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const filtered = listings.filter((listing) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(listing.categoryId);
      const conditionMatch = filters.conditions.length === 0 || filters.conditions.includes(listing.conditionId);
      const locationMatch = !filters.localOnly || (currentUserCity && listing.seller.city === currentUserCity);
      return categoryMatch && conditionMatch && locationMatch;
    });
    setFilteredListings(filtered);
  }, [filters, listings, currentUserCity]);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/6 p-4">
        <ListingFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="w-5/6 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} onUpdate={fetchListings} />
          ))}
        </div>
      </div>
    </div>
  );
}
