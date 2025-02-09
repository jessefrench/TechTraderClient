'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getListingById } from '../../../../api/listingData';
import ListingForm from '../../../../components/forms/ListingForm';

export default function EditListingPage({ params }) {
  const [listing, setlisting] = useState({});
  const { id } = params;

  useEffect(() => {
    getListingById(id).then(setlisting);
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <ListingForm listing={listing} />
    </div>
  );
}

EditListingPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
