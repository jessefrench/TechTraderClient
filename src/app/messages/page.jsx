/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { getLatestMessages, getMessagesByListingId } from '../../api/messageData';
import { useAuth } from '../../utils/context/authContext';
import { getUserById } from '../../api/userData';
import MessageCard from '../../components/cards/MessageCard';
import MessageForm from '../../components/forms/MessageForm';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [senders, setSenders] = useState({});
  const { user } = useAuth();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (user?.id) {
      getLatestMessages(user.id).then(setMessages);
    }
  }, [user?.id]);

  const fetchConversationMessages = (listingId) => {
    if (user?.id && listingId) {
      getMessagesByListingId(user.id, listingId).then((msgs) => {
        setConversationMessages(msgs);

        const senderIds = [...new Set(msgs.map((msg) => msg.senderId))];
        senderIds.forEach((id) => {
          if (id !== user.id && !senders[id]) {
            getUserById(id).then((sender) => {
              setSenders((prev) => ({ ...prev, [id]: sender }));
            });
          }
        });
      });
    }
  };

  const handleSelectConversation = (message) => {
    const { listing } = message;
    setSelectedListing(listing);
    fetchConversationMessages(listing.id);
  };

  const getRecipientName = () => {
    if (!selectedListing || !selectedListing.seller) return 'Unknown';

    if (user.id === selectedListing.seller.id) {
      const senderId = conversationMessages.length > 0 ? conversationMessages[0].senderId : null;
      const sender = senderId ? senders[senderId] : null;
      return sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown';
    }

    return `${selectedListing.seller.firstName} ${selectedListing.seller.lastName}`;
  };

  const handleUpdate = (newMessage) => {
    setConversationMessages((prevMessages) => [...prevMessages, newMessage]);
    getLatestMessages(user.id).then(setMessages);
  };

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7103/messageHub', {
        withCredentials: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection
      .start()
      .then(() => {
        console.log('Connected to SignalR');
        newConnection.invoke('RegisterUser', user.id);
      })
      .catch((error) => console.error('Connection failed:', error));

    return () => {
      newConnection.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.off('ReceiveMessage');
      connection.on('ReceiveMessage', (message) => {
        setConversationMessages((prevMessages) => [...prevMessages, message]);
        getLatestMessages(user.id).then(setMessages);
      });
    }

    return () => {
      if (connection) {
        connection.off('ReceiveMessage');
      }
    };
  }, [connection]);

  return (
    <div className="flex gap-4 p-4">
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
              <MessageCard message={message} user={user} senders={senders} setSenders={setSenders} />
            </div>
          ))
        ) : (
          <p>No conversations yet.</p>
        )}
      </div>

      <div className="w-3/4">
        {selectedListing ? (
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Send a message to {getRecipientName()}</h1>

            <div className="card bg-base-100 shadow-md p-4 mb-4">
              <div className="flex gap-4 items-center">
                <img src={selectedListing.imageUrl} alt={selectedListing.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h2 className="text-xl font-bold">{selectedListing.name}</h2>
                  <p className="text-gray-500">${selectedListing.price}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <ul>
                {conversationMessages.length > 0 ? (
                  conversationMessages.map((msg) => {
                    const sender = msg.senderId === user.id ? user : senders[msg.senderId] || {};
                    return (
                      <div key={msg.id} className={`chat ${msg.senderId === user.id ? 'chat-end' : 'chat-start'} mt-4`}>
                        <div className="chat-image avatar">
                          <div className="w-10 rounded-full">
                            <img alt="Profile" src={sender.imageUrl} />
                          </div>
                        </div>
                        <div className="chat-header">{sender.firstName}</div>
                        <div className="chat-bubble">{msg.content}</div>
                        <div className="chat-footer opacity-50">Sent at: {new Date(msg.sentAt).toLocaleString()}</div>
                      </div>
                    );
                  })
                ) : (
                  <p>No messages yet.</p>
                )}
              </ul>
            </div>

            <MessageForm
              message={{}}
              params={{
                receiverId: user.id === selectedListing.seller.id ? conversationMessages[0]?.senderId : selectedListing.seller.id,
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
