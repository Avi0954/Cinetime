import { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const PlaceholderPage: FC = () => {
    const location = useLocation();
    const title = location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page';
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{capitalize(title)}</h1>
            <p className="text-white/50 text-lg">
                This feature is currently under development. Check back soon!
            </p>
        </div>
    );
};
