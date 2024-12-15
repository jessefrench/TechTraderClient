/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default function ListingDetails({ listing }) {
  const router = useRouter();

  if (!listing.condition || !listing.category || !listing.seller) {
    return <Loading />;
  }

  const handleMessageSeller = () => {
    const listingData = encodeURIComponent(JSON.stringify(listing));
    router.push(`/messages/new?receiverId=${listing.seller.id}&listingData=${listingData}`);
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={listing.imageUrl} alt={listing.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{listing.name}</h2>
        <div className="flex gap-2">
          <div className="badge badge-success">${listing.price}</div>
          <div className="badge badge-outline">{listing.condition.name}</div>
          <div className="badge badge-outline">{listing.category.name}</div>
          <div className="badge badge-outline">
            {listing.seller.firstName} {listing.seller.lastName}
          </div>
          <div className="badge badge-outline">
            {listing.seller.city}, {listing.seller.state}
          </div>
        </div>
        <p>{listing.description}</p>
        <div className="card-actions">
          <button type="button" className="btn btn-primary" onClick={handleMessageSeller}>
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
}

ListingDetails.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    seller: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
    }).isRequired,
    category: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    condition: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
