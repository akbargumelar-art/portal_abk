
import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import { PencilIcon, TrashIcon, UserPlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import SortIcon from '../../components/ui/SortIcon';
import { exportToCsv } from '../../utils/export';
import Notification from '../../components/ui/Notification';
import { getUsers } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../types';

const UserManagementPage: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState<any>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error'; } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getUsers({ page: 1, limit: 100, filters: {}, searchTerm: '', sortConfig, user: currentUser }) as { data: User[] };
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

    const handleExport = () => { /* ... */ };

    return (
        <>
            {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
            <Card title="User Management">
                <div className="flex justify-end mb-4 space-x-2">
                    {/* ... Action buttons ... */}
                </div>
                <div className="overflow-x-auto">
                    {loading ? <div className="text-center py-10">Loading...</div> : (
                    <table className="min-w-full">
                        <thead className="bg-telkomsel-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <button onClick={() => requestSort('name')} className="flex items-center group">Nama <SortIcon sortConfig={sortConfig} forKey="name" /></button>
                                </th>
                                {/* ... Other headers ... */}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    {/* ... table cells ... */}
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
