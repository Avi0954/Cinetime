import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ListedMovie {
    movieId: string;
    title: string;
    posterUrl: string;
    releaseAt: string;
    addedAt: number;
}

interface MyListContextType {
    myList: ListedMovie[];
    addToMyList: (movie: Omit<ListedMovie, 'addedAt'>) => void;
    removeFromMyList: (movieId: string) => void;
    isInMyList: (movieId: string) => boolean;
}

const MyListContext = createContext<MyListContextType | undefined>(undefined);

const STORAGE_KEY = 'cine_time_my_list';

export const MyListProvider = ({ children }: { children: ReactNode }) => {
    const [myList, setMyList] = useState<ListedMovie[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load my list from local storage:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(myList));
        } catch (error) {
            console.error('Failed to save my list to local storage:', error);
        }
    }, [myList]);

    const addToMyList = (movie: Omit<ListedMovie, 'addedAt'>) => {
        setMyList((prev) => {
            if (prev.some((m) => m.movieId === movie.movieId)) return prev;
            return [...prev, { ...movie, addedAt: Date.now() }];
        });
    };

    const removeFromMyList = (movieId: string) => {
        setMyList((prev) => prev.filter((m) => m.movieId !== movieId));
    };

    const isInMyList = (movieId: string) => {
        return myList.some((m) => m.movieId === movieId);
    };

    return (
        <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
            {children}
        </MyListContext.Provider>
    );
};

export const useMyList = () => {
    const context = useContext(MyListContext);
    if (context === undefined) {
        throw new Error('useMyList must be used within a MyListProvider');
    }
    return context;
};
