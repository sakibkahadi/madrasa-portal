'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

const ComingSoon = () => {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            backgroundImage: 'url("/assets/bannerBg.png")', // Replace with your image URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0 , 0.5)', // Dark overlay
            }} />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <h1 style={{ fontSize: '4em', margin: 0 }} className='text-white'>Coming Soon</h1>
                <p style={{ fontSize: '1.5em' }} className='text-white'>We&apos;re working hard to bring you something amazing!</p>

                {/* Navigation Options */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-accent text-white font-medium hover:bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <Home size={18} />
                        <span>Back to Home</span>
                    </Link>
                    
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Go Back
                    </button>
                </div>

                {/* Auto-redirect message */}
                <p className="mt-8 text-sm text-white">
                    Redirecting to homepage in {countdown} seconds...
                    {countdown === 0 && typeof window !== 'undefined' && window.location.replace('/dashboard')}
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;
