'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../../utils/context/authContext';
import MessageForm from '../../../components/forms/MessageForm';
import { getMessagesBySellerId } from '../../../api/messageData';

export default function NewMessagePage() {
  const searchParams = useSearchParams();
  const receiverId = searchParams.get('receiverId');
  const listingId = searchParams.get('listingId');
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState({});

  const fetchMessages = () => {
    if (user?.id) {
      getMessagesBySellerId(user.id, receiverId).then(setMessages);
    }
  };

  useEffect(() => {
    fetchMessages();
  });

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
              <li key={msg.id} className="border-b border-gray-300 py-2">
                <p className="font-light text-gray-600">{msg.content}</p>
                <p className="text-sm text-gray-500">Sent at: {new Date(msg.sentAt).toLocaleString()}</p>
              </li>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </ul>
      </div>
      <MessageForm message={selectedMessage} params={{ receiverId: parseInt(receiverId, 10), listingId: parseInt(listingId, 10) }} onUpdate={handleUpdate} />
    </div>
  );
}
