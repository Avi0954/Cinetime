
import { FC, ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface PublicLayoutProps {
    children: ReactNode;
}

export const PublicLayout: FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-bg text-white font-sans flex flex-col">
            {/* 
                Navbar Source of Truth:
                - Fixed position
                - Height defined in Header (h-20 = 80px)
            */}
            <Header />

            {/* 
                Main Content:
                - pt-20 (80px) to matches Header height
                - flex-grow to push footer down
            */}
            <main className="flex-grow pt-20">
                {children}
            </main>

            <Footer />
        </div>
    );
};
