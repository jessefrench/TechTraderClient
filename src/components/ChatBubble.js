/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';

export default function ChatBubble({ message }) {
  console.log(message);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <div className="w-full max-w-lg">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-bubble">Its over Anakin, I have the high ground.</div>
        </div>

        <div className="chat chat-end mt-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="chat-bubble">You underestimate my power!</div>
        </div>

        <label className="input input-bordered flex items-center gap-2 mt-6 w-full">
          <input type="text" className="grow" placeholder="Type here to send a message" />
        </label>
      </div>
    </div>
  );
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    senderId: PropTypes.number,
    receiverId: PropTypes.number,
    listingId: PropTypes.number,
    content: PropTypes.string,
    sentAt: PropTypes.instanceOf(Date),
  }),
};
