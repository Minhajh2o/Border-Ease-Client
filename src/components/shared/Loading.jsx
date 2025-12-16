const Loading = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <div className="text-center">
                {/* Animated Logo */}
                <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🌍</span>
                    </div>
                </div>
                
                <h3 className="text-lg font-semibold text-base-content mb-2">Loading...</h3>
                <p className="text-sm text-base-content/60">Preparing your visa journey</p>
            </div>
        </div>
    );
};

export default Loading;
