/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';
import MessageCard from '../../components/cards/MessageCard';
import { useAuth } from '../../utils/context/authContext';
import MessageForm from '../../components/forms/MessageForm';
import { getLatestMessages, getMessagesByListingId } from '../../api/messageData';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getLatestMessages(user.id).then(setMessages);
    }
  }, [user?.id]);

  const fetchConversationMessages = (listingId) => {
    if (user?.id && listingId) {
      getMessagesByListingId(user.id, listingId).then(setConversationMessages);
    }
  };

  const handleSelectConversation = (message) => {
    const { listing } = message;
    setSelectedListing(listing);
    fetchConversationMessages(listing.id);
  };

  const handleUpdate = () => {
    if (selectedListing) {
      fetchConversationMessages(selectedListing.id);
      getLatestMessages(user.id).then(setMessages);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      {/* Sidebar with Message Cards */}
      <div className="w-1/3 overflow-y-auto h-screen">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              role="button"
              tabIndex={0}
              aria-label={`Select conversation with ${message.name}`}
              onClick={() => handleSelectConversation(message)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelectConversation(message);
                }
              }}
            >
              <MessageCard message={message} />
            </div>
          ))
        ) : (
          <p>No conversations yet.</p>
        )}
      </div>

      {/* Main area showing conversation and message form */}
      <div className="w-3/4">
        {selectedListing ? (
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
              Send a message to {selectedListing.seller.firstName} {selectedListing.seller.lastName}
            </h1>

            {/* Listing Data */}
            <div className="card bg-base-100 shadow-md p-4 mb-4">
              <div className="flex gap-4 items-center">
                <img src={selectedListing.imageUrl} alt={selectedListing.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h2 className="text-xl font-bold">{selectedListing.name}</h2>
                  <p className="text-gray-500">${selectedListing.price}</p>
                </div>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="mt-8">
              <ul>
                {conversationMessages.length > 0 ? (
                  conversationMessages.map((msg) => (
                    <div key={msg.id} className={`chat ${msg.senderId === user.id ? 'chat-end' : 'chat-start'} mt-4`}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img alt="Profile" src={msg.senderId === user.id ? user.imageUrl : selectedListing.seller.imageUrl} />
                        </div>
                      </div>
                      <div className="chat-header">{msg.senderId === user.id ? user.firstName : selectedListing.seller.firstName}</div>
                      <div className="chat-bubble">{msg.content}</div>
                      <div className="chat-footer opacity-50">Sent at: {new Date(msg.sentAt).toLocaleString()}</div>
                    </div>
                  ))
                ) : (
                  <p>No messages yet.</p>
                )}
              </ul>
            </div>

            {/* Message Form */}
            <MessageForm
              message={{}}
              params={{
                receiverId: selectedListing.seller.id,
                listingId: selectedListing.id,
              }}
              onUpdate={handleUpdate}
            />
          </div>
        ) : (
          <p>Select a conversation to view messages</p>
        )}
      </div>
    </div>
  );
}
