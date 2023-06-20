import React, { useEffect, useState } from 'react';
import './User.css';
import { db } from '..';
import { collection, getDocs } from 'firebase/firestore';
interface User {
  id: string;
  displayName: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const userList: User[] = snapshot.docs.map((doc) => doc.data() as User);
      setUsers(userList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      {users.map((user) => (
        <div key={user.id} className="user-list-item">
          <h3>{user.displayName}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
