import PropTypes from 'prop-types';

export default function MessageCard({ message }) {
  return (
    <div className="card bg-primary text-primary-content w-96 shadow-xl mb-1">
      <div className="card-body">
        <h2 className="card-title">
          {message.listing.seller.firstName} {message.listing.seller.lastName}
        </h2>
        <div className="badge badge-outline">{message.listing.name}</div>
        <p>{message.content}</p>
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    listing: PropTypes.shape({
      name: PropTypes.string,
      seller: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    }),
  }),
};
