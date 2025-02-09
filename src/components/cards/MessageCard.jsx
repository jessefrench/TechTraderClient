import PropTypes from 'prop-types';
import { getUserById } from '../../api/userData';

export default function MessageCard({ message, user, senders, setSenders }) {
  const recipientId = message.senderId === user.id ? message.receiverId : message.senderId;

  const getRecipientName = () => {
    if (recipientId === user.id) {
      return 'You';
    }
    const recipient = senders[recipientId];

    if (!recipient) {
      getUserById(recipientId).then((sender) => {
        setSenders((prev) => ({ ...prev, [recipientId]: sender }));
      });
      return 'Fetching...';
    }

    return `${recipient.firstName} ${recipient.lastName}`;
  };

  return (
    <div className="card bg-neutral text-neutral-content w-96 shadow-xl mb-1">
      <div className="card-body">
        <h2 className="card-title">{getRecipientName()}</h2>
        <div className="badge badge-outline">{message.listing.name}</div>
        <p>{message.content}</p>
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string,
    senderId: PropTypes.number,
    receiverId: PropTypes.number,
    listing: PropTypes.shape({
      name: PropTypes.string,
      seller: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
    }),
  }),
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  senders: PropTypes.object,
  setSenders: PropTypes.func.isRequired,
};
