'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../../utils/context/authContext';
import MessageForm from '../../../components/forms/MessageForm';
import { getMessagesByListingId } from '../../../api/messageData';
import { getUserById } from '../../../api/userData';

export default function NewMessagePage() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get('receiverId');
  const listingId = searchParams.get('listingId');
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [seller, setSeller] = useState({});
  console.log(seller);

  const fetchMessages = () => {
    if (user?.id) {
      getMessagesByListingId(user.id, listingId).then(setMessages);
    }
  };

  const fetchSellerData = () => {
    getUserById(Number('17')).then(setSeller);
  };

  useEffect(() => {
    fetchMessages();
    fetchSellerData();
  }, [user?.id, listingId]);

  const handleUpdate = () => {
    fetchMessages();
    setSelectedMessage({});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Send a Message to the Seller</h1>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Previous Messages</h2>
        <ul>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className={`chat ${msg.senderId === user.id ? 'chat-end' : 'chat-start'} mt-4`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Profile" src={msg.senderId === user.id ? user.imageUrl : seller.imageUrl} />
                  </div>
                </div>
                <div className="chat-header">{msg.senderId === user.id ? user.firstName : seller.firstName}</div>
                <div className="chat-bubble">{msg.content}</div>
                <div className="chat-footer opacity-50">Sent at: {new Date(msg.sentAt).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </ul>
      </div>
      <MessageForm
        message={selectedMessage}
        params={{
          receiverId: parseInt(receiverId, 10),
          listingId: parseInt(listingId, 10),
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
