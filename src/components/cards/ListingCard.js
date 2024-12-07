/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../utils/context/authContext';
import { deleteListing } from '../../api/listingData';

export default function ListingCard({ listing, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();
  const isOwner = user.id === listing.sellerId;

  const deleteThisListing = () => {
    if (window.confirm(`Delete ${listing.name}?`)) {
      deleteListing(listing.id).then(() => onUpdate());
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={listing.imageUrl} alt={listing.name} style={{ width: '400px', height: '400px' }} />
      </figure>
      <div className="card-body">
        <Link passHref href={`/listings/${listing.id}`}>
          <h2 className="card-title">{listing.name}</h2>
        </Link>
        <div className="card-actions">
          <div className="badge badge-success">${listing.price}</div>
          <div className="badge badge-outline">{listing.condition.name}</div>
        </div>
        <div className="card-actions">
          {isOwner && (
            <details className="dropdown">
              <summary className="btn btn-primary m-1">More</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/listings/edit/${listing.id}`);
                    }}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button type="button" onClick={deleteThisListing}>
                    Delete
                  </button>
                </li>
              </ul>
            </details>
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
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
