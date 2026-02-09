import { FC } from 'react';
import { Countdown } from './Countdown';
import { useCountdown } from '../../hooks/useCountdown';
// import { ReminderButton } from '../ReminderButton'; // Unused
import { useMyList } from '../../context/MyListContext';

interface MovieCardProps {
    movieId: string;
    title: string;
    posterUrl: string;
    releaseAt: string; // ISO 8601 UTC string
    variant?: 'default' | 'mylist';
}

export const MovieCard: FC<MovieCardProps> = ({ movieId, title, posterUrl, releaseAt, variant = 'default' }) => {
    const { days, hours, minutes, seconds } = useCountdown(releaseAt);
    const { addToMyList, removeFromMyList, isInMyList } = useMyList();
    const inList = isInMyList(movieId);

    const toggleMyList = () => {
        if (inList) {
            removeFromMyList(movieId);
        } else {
            addToMyList({ movieId, title, posterUrl, releaseAt });
        }
    };

    // Release date validity check
    const isValidDate = !isNaN(new Date(releaseAt).getTime());

    // Formatting release date
    const formattedDate = isValidDate
        ? new Date(releaseAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).toUpperCase()
        : 'TO BE ANNOUNCED';

    // Simple urgency check: urgent if releasing within 24 hours
    const isUrgent = days === 0 && hours < 24;

    return (
        <div className="group flex flex-col h-full bg-surface/50 border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10">
            {/* Poster Section (Dominant) */}
            <div className="relative aspect-[2/3] w-full bg-bg overflow-hidden">
                <img
                    src={posterUrl}
                    alt={`${title} Poster`}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 ease-out md:group-hover:scale-105 will-change-transform"
                />
                {/* Gradient removed for clearer poster visibility, only subtle bottom shade */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent opacity-80" />

                {/* My List Toggle Button - Absolute Top Right */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMyList();
                    }}
                    className={`
                        absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300
                        ${inList
                            ? 'bg-[#E50914] text-white hover:bg-[#b00710]'
                            : 'bg-black/30 text-white/70 hover:bg-black/50 hover:text-white border border-white/10'
                        }
                    `}
                    aria-label={inList ? "Remove from My List" : "Add to My List"}
                >
                    {inList ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-3 md:p-5 space-y-3 md:space-y-5 flex-grow">
                {/* 1. Title - Reduced visual weight to prioritize countdown */}
                <h3 className="text-base md:text-lg font-bold text-white/90 tracking-wider leading-tight text-center uppercase group-hover:text-accent transition-colors duration-300">
                    {title}
                </h3>

                {/* Release Date - Option 4: Cinematic Lines */}
                <div className="flex items-center justify-center gap-3 my-2 opacity-80">
                    <div className="h-px bg-gradient-to-r from-transparent to-white/20 w-12" />
                    <span className="text-sm font-bold text-white/90 tracking-[0.15em] uppercase whitespace-nowrap">
                        {formattedDate}
                    </span>
                    <div className="h-px bg-gradient-to-l from-transparent to-white/20 w-12" />
                </div>

                {/* 2. Countdown - The Hero */}
                <div className="flex justify-center flex-grow items-center">
                    <Countdown
                        days={days}
                        hours={hours}
                        minutes={minutes}
                        seconds={seconds}
                        urgent={isUrgent}
                    />
                </div>

                {/* 3. Button - Minimal & Functional */}
                {/* 3. Button - Minimal & Functional */}
                {/* 3. Button - Responsive Width & Text */}
                <div className="w-full mt-auto pt-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleMyList();
                        }}
                        className={`
                            w-full py-2 md:py-2.5 rounded font-bold text-[10px] md:text-xs transition-all duration-300 flex items-center justify-center gap-1.5 uppercase tracking-wider
                            ${variant === 'mylist'
                                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white'
                                : inList
                                    ? 'bg-white/10 text-white/90 border border-white/5'
                                    : 'bg-white text-black hover:bg-white/90'
                            }
                        `}
                    >
                        {variant === 'mylist' ? (
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Remove</span>
                            </>
                        ) : inList ? (
                            <>
                                <span>Reminder Set</span>
                                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </>
                        ) : (
                            <span>Remind Me</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
