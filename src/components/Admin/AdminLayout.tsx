import { FC, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export const AdminLayout: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login', { state: { from: location } });
        } else {
            setAuthorized(true);
        }
    }, [navigate, location]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    if (!authorized) return null;

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
            {/* Minimal Admin Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="text-xl font-bold tracking-tight text-gray-800">
                        CineTime <span className="text-red-600">Admin</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/admin')}
                            className="text-sm font-medium text-gray-500 hover:text-gray-900"
                        >
                            Movies
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};
