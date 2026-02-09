import { FC } from 'react';

interface CountdownProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    urgent?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export const Countdown: FC<CountdownProps> = ({ days, hours, minutes, seconds, urgent = false, size = 'md' }) => {
    // Format numbers to always be 2 digits
    const format = (num: number) => num.toString().padStart(2, '0');

    const digitSize = {
        sm: 'text-xl',
        md: 'text-2xl md:text-3xl lg:text-4xl',
        lg: 'text-5xl'
    }[size];

    const labelSize = {
        sm: 'text-[0.5rem]',
        md: 'text-[0.65rem]',
        lg: 'text-xs'
    }[size];

    return (
        <div className={`inline-flex items-center justify-center gap-x-3 md:gap-x-0 tracking-wider animate-fade-in motion-reduce:animate-none ${urgent ? 'text-accent' : 'text-white'}`}>
            {/* Days */}
            <DigitGroup value={format(days)} label="d" sizeClass={digitSize} labelClass={labelSize} />

            <Separator size={size} />

            {/* Hours */}
            <DigitGroup value={format(hours)} label="h" sizeClass={digitSize} labelClass={labelSize} />

            <Separator size={size} />

            {/* Minutes */}
            <DigitGroup value={format(minutes)} label="m" sizeClass={digitSize} labelClass={labelSize} />

            <Separator size={size} />

            {/* Seconds */}
            <DigitGroup value={format(seconds)} label="s" sizeClass={digitSize} labelClass={labelSize} />
        </div>
    );
};

const DigitGroup: FC<{ value: string; label: string; sizeClass: string; labelClass: string }> = ({ value, label, sizeClass, labelClass }) => (
    <div className="flex items-baseline group cursor-default">
        <span className={`${sizeClass} font-mono font-medium leading-none tracking-tight text-white/90`}>
            {value}
        </span>
        <span className={`ml-0.5 md:ml-1 ${labelClass} text-white/40 font-bold uppercase font-sans group-hover:text-white/60 transition-colors`}>
            {label}
        </span>
    </div>
);

const Separator: FC<{ size: 'sm' | 'md' | 'lg' }> = ({ size }) => (
    <span className={`hidden md:inline mx-1 md:mx-2 text-white/10 font-light -mt-1 ${size === 'sm' ? 'text-lg' : 'text-2xl'}`}>:</span>
);
