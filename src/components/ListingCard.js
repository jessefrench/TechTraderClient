/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function ListingCard({ listing }) {
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
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    condition: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
