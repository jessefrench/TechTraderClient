/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../../utils/context/authContext';
import MessageForm from '../../../components/forms/MessageForm';
import { getMessagesByListingId } from '../../../api/messageData';

export default function NewMessagePage() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get('receiverId');
  const listingData = searchParams.get('listingData');
  const listing = listingData ? JSON.parse(decodeURIComponent(listingData)) : null;
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({});

  const fetchMessages = () => {
    if (user?.id && listing?.id) {
      getMessagesByListingId(user.id, listing.id).then(setMessages);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user?.id, listing?.id]);

  const handleUpdate = () => {
    fetchMessages();
    setSelectedMessage({});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Send a message to {listing.seller.firstName} {listing.seller.lastName}
      </h1>

      {/* Listing Data */}
      {listing && (
        <div className="card bg-base-100 shadow-md p-4 mb-4">
          <div className="flex gap-4 items-center">
            <img src={listing.imageUrl} alt={listing.name} className="w-20 h-20 object-cover rounded" />
            <div>
              <h2 className="text-xl font-bold">{listing.name}</h2>
              <p className="text-gray-500">${listing.price}</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="mt-8">
        <ul>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className={`chat ${msg.senderId === user.id ? 'chat-end' : 'chat-start'} mt-4`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Profile" src={msg.senderId === user.id ? user.imageUrl : listing.seller.imageUrl} />
                  </div>
                </div>
                <div className="chat-header">{msg.senderId === user.id ? user.firstName : listing.seller.firstName}</div>
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
          listingId: listing?.id,
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
