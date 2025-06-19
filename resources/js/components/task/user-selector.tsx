import type { UserSelectorProps } from '@/types';

const UserSelector: React.FC<UserSelectorProps> = ({ users, selectedUserId, onChange }) => {
  return (
    <select
      value={selectedUserId ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
    >
      <option value="">Select User</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.email}
        </option>
      ))}
    </select>
  );
};

export default UserSelector;