import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top on route change, unless it's the home page
        // "Release" page is assumed to be home ('/') based on user request "except release"
        if (pathname !== '/') {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};
