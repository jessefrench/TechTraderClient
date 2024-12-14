import MessageCard from '../../components/cards/MessageCard';
import NewMessagePage from './new/page';

export default function MessagesPage() {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-1/3">
        <MessageCard />
      </div>
      <div className="w-3/4">
        <NewMessagePage />
      </div>
    </div>
  );
}
