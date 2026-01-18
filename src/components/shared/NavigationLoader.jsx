import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router';

const NavigationLoader = () => {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);
    const isLoading = navigation.state === 'loading';

    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            const timer1 = setTimeout(() => setProgress(30), 100);
            const timer2 = setTimeout(() => setProgress(60), 300);
            const timer3 = setTimeout(() => setProgress(80), 600);
            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        } else {
            setProgress(100);
            const timer = setTimeout(() => setProgress(0), 200);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isLoading && progress === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent">
            <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-300 ease-out"
                style={{ 
                    width: `${progress}%`,
                    boxShadow: '0 0 10px var(--color-primary), 0 0 5px var(--color-primary)'
                }}
            />
        </div>
    );
};

export default NavigationLoader;
