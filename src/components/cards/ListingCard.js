/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { deleteListing } from '../../api/listingData';

export default function ListingCard({ listing, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const isListingOwner = user.id === listing.sellerId;

  const handleEdit = () => {
    router.push(`/listings/edit/${listing.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete ${listing.name}?`)) {
      deleteListing(listing.id).then(() => onUpdate());
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
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
          {isListingOwner && (
            <div className="dropdown dropdown-top dropdown-end ml-auto">
              <div tabIndex={0} role="button" className="btn btn-secondary btn-xs m-1">
                More
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <button type="button" onClick={handleEdit}>
                    Edit
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleDelete}>
                    Delete
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
