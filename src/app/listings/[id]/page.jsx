/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ListingDetails from '../../../components/ListingDetails';
import { getListingById } from '../../../api/listingData';

export default function ListingDetailsPage({ params }) {
  const [listing, setListing] = useState({});
  const { id } = params;

  const getListingDetails = () => {
    getListingById(id).then(setListing);
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <ListingDetails listing={listing} />
    </div>
  );
}

ListingDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
