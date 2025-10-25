
import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import SortIcon from '../../components/ui/SortIcon';
import Notification from '../../components/ui/Notification';
import { getUsers } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types';

const UserManagementPage: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<any>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getUsers({ sortConfig, user: currentUser }) as { data: User[] };
                setUsers(result.data);
            } catch (error) {
                setNotification({ message: 'Failed to load user data.', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [sortConfig, currentUser]);
    
    const requestSort = (key: keyof User) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <>
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            <Card title="User Management">
                <div className="overflow-x-auto">
                    {loading ? <div className="text-center py-10">Loading...</div> : (
                    <table className="min-w-full">
                        <thead className="bg-telkomsel-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <button onClick={() => requestSort('name')} className="flex items-center group">Nama <SortIcon sortConfig={sortConfig} forKey="name" /></button>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <button onClick={() => requestSort('role')} className="flex items-center group">Role <SortIcon sortConfig={sortConfig} forKey="role" /></button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
            </Card>
        </>
    );
};

export default UserManagementPage;