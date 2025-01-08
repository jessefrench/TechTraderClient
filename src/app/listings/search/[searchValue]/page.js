'use client';

import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../../../utils/context/authContext';
import ListingFilter from '../../../../components/ListingFilter';
import ListingCard from '../../../../components/cards/ListingCard';
import { searchListings } from '../../../../api/listingData';

export default function SearchListingsPage({ params }) {
  const { user } = useAuth();
  const { searchValue } = params;
  const [searchedListings, setSearchedListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [currentUserCity, setCurrentUserCity] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    conditions: [],
    localOnly: false,
  });

  useEffect(() => {
    if (searchValue) {
      searchListings(searchValue).then((data) => {
        setSearchedListings(data);
        setFilteredListings(data);
      });
    }
    setCurrentUserCity(user.city);
  }, [searchValue, user.city]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const filtered = searchedListings.filter((listing) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(listing.categoryId);
      const conditionMatch = filters.conditions.length === 0 || filters.conditions.includes(listing.conditionId);
      const locationMatch = !filters.localOnly || (currentUserCity && listing.seller.city === currentUserCity);
      return categoryMatch && conditionMatch && locationMatch;
    });
    setFilteredListings(filtered);
  }, [filters, searchedListings, currentUserCity]);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/6 p-4">
        <ListingFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="w-5/6 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}

SearchListingsPage.propTypes = {
  params: PropTypes.shape({
    searchValue: PropTypes.string,
  }).isRequired,
};
