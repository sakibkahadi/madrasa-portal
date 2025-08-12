import React, { useEffect, useState } from 'react';

const MosqueLoader = ({ loading = true, size = 250, duration = 3000, primaryColor = "#fff", accentColor = "#000" }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!loading) {
            setProgress(100);
            return;
        }

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            // Normal progress calculation
            const newProgress = Math.min(100, (elapsed / duration) * 100);

            setProgress(newProgress);

            if (newProgress < 100) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Reset animation after completion for continuous loading effect
                startTime = null;
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [loading, duration]);

    // Calculate the color based on progress (from white to black)
    const getColorValue = (progress) => {
        const colorValue = Math.floor(255 - (progress / 100) * 255); // Inverted color calculation
        return `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    };

    return (
        <div style={{ width: size, height: size, position: 'relative' }}>
            {/* Outer circle */}
            <svg width={size} height={size} viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#eee"
                    strokeWidth="2"
                />

                {/* SVG Mosque Icon - centered and scaled */}
                <g transform="translate(30, 30) scale(0.7)"> {/* Adjusted for centering */}
                    {/* Define gradient for animating color transition */}
                    <defs>
                        <linearGradient id="colorTransition" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor={getColorValue(progress)} />
                            <stop offset="100%" stopColor={getColorValue(progress)} />
                        </linearGradient>
                    </defs>

                    {/* Your mosque SVG path with fill set to the gradient */}
                    <path fill="url(#colorTransition)" d="M60,8.193c0-1.894-2.046-3.854-3-4.666V1a1,1,0,0,0-2,0V3.527c-.954.812-3,2.772-3,4.666a3.244,3.244,0,0,0,1,2.223V23.278A1.993,1.993,0,0,0,52,25v4a1.993,1.993,0,0,0,1,1.722V45H50V42a1,1,0,0,0,1-1,.979.979,0,0,0-.427-.8A4.574,4.574,0,0,0,51,38.289c0-2.719-2.938-5.729-4-6.729V28a1,1,0,0,0-2,0v3.56c-1.062,1-4,4.01-4,6.729a4.574,4.574,0,0,0,.427,1.914A.979.979,0,0,0,41,41a1,1,0,0,0,1,1v3H38V43a1,1,0,0,0,0-2H37V37a1,1,0,0,0,1-1,.982.982,0,0,0-.408-.785A7.559,7.559,0,0,0,39,30.88c0-5.041-6.4-10.945-8-12.339V15a1,1,0,0,0-2,0v3.541c-1.6,1.394-8,7.3-8,12.339a7.559,7.559,0,0,0,1.408,4.335A.982.982,0,0,0,22,36a1,1,0,0,0,1,1v4H22a1,1,0,0,0,0,2v2H18V42a1,1,0,0,0,1-1,.979.979,0,0,0-.427-.8A4.574,4.574,0,0,0,19,38.289c0-2.719-2.938-5.729-4-6.729V28a1,1,0,0,0-2,0v3.56c-1.062,1-4,4.01-4,6.729A4.574,4.574,0,0,0,9.427,40.2.979.979,0,0,0,9,41a1,1,0,0,0,1,1v3H7V30.722A1.993,1.993,0,0,0,8,29V25a1.993,1.993,0,0,0-1-1.722V10.416A3.244,3.244,0,0,0,8,8.193C8,6.3,5.954,4.339,5,3.527V1A1,1,0,0,0,3,1V3.527C2.046,4.339,0,6.3,0,8.193a3.244,3.244,0,0,0,1,2.223V23.278A1.993,1.993,0,0,0,0,25v4a1.993,1.993,0,0,0,1,1.722V59a1,1,0,0,0,1,1H58a1,1,0,0,0,1-1V30.722A1.993,1.993,0,0,0,60,29V25a1.993,1.993,0,0,0-1-1.722V10.416A3.244,3.244,0,0,0,60,8.193ZM58,29H54V25h4Zm-1-6H55V11h2ZM56,5.315c.957.881,2,2.124,2,2.878A1.252,1.252,0,0,1,57.612,9H54.388A1.252,1.252,0,0,1,54,8.193C54,7.439,55.043,6.2,56,5.315ZM46,33.375c1.36,1.363,3,3.477,3,4.914A2.6,2.6,0,0,1,48.339,40H43.661A2.6,2.6,0,0,1,43,38.289C43,36.852,44.64,34.738,46,33.375ZM44,42h4v3H44Zm9,5V58H50V50a1,1,0,0,0-2,0v8H46V50a1,1,0,0,0-2,0v8H42V50a1,1,0,0,0-2,0v8H38V47ZM37,30.88A5.647,5.647,0,0,1,35.154,35H33.476A15.766,15.766,0,0,0,34,30.88a28.08,28.08,0,0,0-1.5-8.08C34.7,25.2,37,28.361,37,30.88ZM28.622,35A13.1,13.1,0,0,1,28,30.88,29.516,29.516,0,0,1,30,21.7a29.516,29.516,0,0,1,2,9.178A13.1,13.1,0,0,1,31.378,35ZM27.5,22.8A28.08,28.08,0,0,0,26,30.88,15.766,15.766,0,0,0,26.524,35H24.846A5.647,5.647,0,0,1,23,30.88C23,28.361,25.3,25.2,27.5,22.8ZM25,37H35v4H25Zm11,6V58H34V47a1,1,0,0,0-2,0V58H28V47a1,1,0,0,0-2,0V58H24V43ZM14,33.375c1.36,1.363,3,3.477,3,4.914A2.6,2.6,0,0,1,16.339,40H11.661A2.6,2.6,0,0,1,11,38.289C11,36.852,12.64,34.738,14,33.375ZM12,42h4v3H12Zm10,5V58H19V50a1,1,0,0,0-2,0v8H15V50a1,1,0,0,0-2,0v8H11V50a1,1,0,0,0-2,0v8H7V47ZM2,25H6v4H2ZM3,11H5V23H3ZM4,5.315c.957.881,2,2.124,2,2.878A1.252,1.252,0,0,1,5.612,9H2.388A1.252,1.252,0,0,1,2,8.193C2,7.439,3.043,6.2,4,5.315ZM3,31H5V58H3ZM57,58H55V31h2Z" />
                </g>

                {/* Progress circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={accentColor}
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 45 * progress / 100} ${2 * Math.PI * 45}`}
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.1s ease-in-out" }}
                />
            </svg>

            {/* Percentage text */}
            {/* <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '0',
                right: '0',
                textAlign: 'center',
                fontSize: size * 0.14,
                fontFamily: 'Arial, sans-serif',
                color: getColorValue(progress),
                fontWeight: 'bold'
            }}>
                {Math.round(progress)}%
            </div> */}
        </div>
    );
};

export default MosqueLoader;
