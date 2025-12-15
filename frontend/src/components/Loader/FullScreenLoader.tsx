
const Loader = () => {
    const text = "CareLoopAI".split("");

    return (
        <div className="flex items-center justify-center my-8 scale-[2]">
            <div className="relative flex items-center justify-center h-[120px] font-poppins text-[1.6em] font-semibold text-white select-none">

                {text.map((char, index) => (
                    <span
                        key={index}
                        className={`loader-letter`}
                        style={{ animationDelay: `${0.1 + index * 0.105}s` }}
                    >
                        {char}
                    </span>
                ))}

                <div className="loader-effect" />
            </div>
        </div>
    );
};

const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            <Loader />
        </div>
    );
};

export default FullScreenLoader;
