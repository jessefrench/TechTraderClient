import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { createMessage, updateMessage } from '../../api/messageData';

export default function MessageForm({ message = { id: null, senderId: null, receiverId: null, listingId: null, content: '', sentAt: '' }, params, onUpdate }) {
  const { user } = useAuth();
  const { receiverId } = params;

  // Initialize formInput with default structure
  const [formInput, setFormInput] = useState({
    message: '',
  });

  useEffect(() => {
    if (message) {
      setFormInput(message);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      receiverId: parseInt(receiverId, 10),
      senderId: user.id,
      sentAt: new Date().toUTCString(),
    };

    if (message?.id) {
      updateMessage(message.id, payload).then(() => onUpdate());
    } else {
      createMessage(payload).then(() => onUpdate());
    }
  };

  return (
    <form className="pop-font text-white flex items-center justify-end" onSubmit={handleSubmit}>
      <div className="message-form flex items-start p-2 md:p-4 w-full">
        <div className="flex-grow mb-0 mr-1">
          <input type="text" className="input input-bordered w-full rounded-full px-4 py-2 font-light" placeholder="Type your message here..." name="message" value={formInput.message || ''} onChange={handleChange} autoComplete="off" />
        </div>
        <button type="submit" className="btn btn-primary font-light rounded-full">
          Send
        </button>
      </div>
    </form>
  );
}

MessageForm.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    senderId: PropTypes.number,
    receiverId: PropTypes.number,
    listingId: PropTypes.number,
    content: PropTypes.string,
    sentAt: PropTypes.string, // Updated to string type
  }),
  params: PropTypes.shape({
    receiverId: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
