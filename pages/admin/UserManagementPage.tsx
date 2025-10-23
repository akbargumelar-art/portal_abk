import React from 'react';
import Card from '../../components/ui/Card';
import { MOCK_USERS } from '../../constants';
import { PencilIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const UserManagementPage: React.FC = () => {
    const users = Object.values(MOCK_USERS);

    return (
        <Card title="User Management">
             <div className="flex justify-end mb-4">
                <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-telkomsel-red py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-telkomsel-dark-red">
                    <UserPlusIcon className="h-5 w-5 mr-2"/>
                    Tambah User
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-telkomsel-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User ID</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {users.map((user, index) => (
                            <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-telkomsel-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button className="text-blue-600 hover:text-blue-900" title="Edit"><PencilIcon className="h-5 w-5"/></button>
                                    <button className="text-red-600 hover:text-red-900" title="Delete"><TrashIcon className="h-5 w-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default UserManagementPage;