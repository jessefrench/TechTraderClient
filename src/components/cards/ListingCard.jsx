/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBookmark, FaEllipsis, FaPenToSquare, FaRegBookmark, FaRegTrashCan } from 'react-icons/fa6';
import { useAuth } from '../../utils/context/authContext';
import { deleteListing } from '../../api/listingData';
import { addSavedListing, getSavedListings, removeSavedListing } from '../../api/savedListingData';

export default function ListingCard({ listing, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const isListingOwner = user.id === listing.sellerId;

  useEffect(() => {
    getSavedListings(user.id)
      .then((savedListings) => {
        const isListingSaved = savedListings.some((saved) => saved.listingId === listing.id);
        setIsSaved(isListingSaved);
      })
      .catch((error) => console.error('Error fetching saved listings:', error));
  }, [user.id, listing.id]);

  const handleEdit = () => {
    router.push(`/listings/edit/${listing.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${listing.name}?`)) {
      deleteListing(listing.id).then(() => onUpdate());
    }
  };

  const handleToggleSave = () => {
    const payload = {
      listingId: listing.id,
      userId: user.id,
    };

    if (isSaved) {
      removeSavedListing(listing.id, user.id)
        .then(() => {
          setIsSaved(false);
          alert(`${listing.name} has been removed from saved listings.`);
        })
        .catch((error) => {
          console.error('Error removing saved listing:', error);
          alert('Failed to remove listing. Please try again.');
        });
    } else {
      addSavedListing(payload, listing.id, user.id)
        .then(() => {
          setIsSaved(true);
          alert(`${listing.name} has been saved!`);
        })
        .catch((error) => {
          console.error('Error saving listing:', error);
          alert('Failed to save listing. Please try again.');
        });
    }
  };

  return (
    <div className="card bg-base-100 w-85 shadow-xl">
      <figure>
        <img src={listing.imageUrl} alt={listing.name} style={{ width: '400px', height: '300px' }} />
      </figure>
      <div className="card-body">
        <Link passHref href={`/listings/${listing.id}`}>
          <h2 className="card-title">{listing.name}</h2>
        </Link>
        <div className="card-actions flex items-center gap-x-2">
          <div className="badge badge-success">${listing.price}</div>
          <div className="badge badge-outline">
            {listing.seller.city}, {listing.seller.state}
          </div>
          <button type="button" className="btn btn-ghost btn-xs m-1" aria-label="Toggle save listing" onClick={handleToggleSave}>
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          {isListingOwner && (
            <div className="dropdown dropdown-top dropdown-end ml-auto">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-xs m-1" aria-label="Click for more">
                <FaEllipsis />
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <button type="button" onClick={handleEdit}>
                    <FaPenToSquare /> Edit
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleDelete}>
                    <FaRegTrashCan /> Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    sellerId: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    condition: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    seller: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
