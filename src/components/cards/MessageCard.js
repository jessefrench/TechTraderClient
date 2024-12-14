'use client';

import { useEffect, useState } from 'react';
import { getLatestMessages } from '../../api/messageData';
import { useAuth } from '../../utils/context/authContext';

export default function MessageCard() {
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getLatestMessages(user.id).then(setMessages);
  }, [user.id]);

  return (
    <>
      {messages.map((message) => (
        <div className="card bg-primary text-primary-content w-96 shadow-xl mb-1">
          <div className="card-body">
            <h2 className="card-title">
              {message.listing.seller.firstName} {message.listing.seller.lastName}
            </h2>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
