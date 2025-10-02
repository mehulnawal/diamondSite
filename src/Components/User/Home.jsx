import React, { useState, useEffect, useRef } from 'react';
// Added Search icon (renamed from ChevronRight in original file) and Globe icon to imports
// Imported PauseCircle for the custom video controls
import { Diamond, Star, ChevronLeft, ChevronDown, Globe, Search, PlayCircle, PauseCircle } from "lucide-react";

// Statistics Data for the counter section
const stats = [
    {
        icon: Globe,
        initialValue: 0,
        finalValue: 10,
        suffix: "+ Countries",
        duration: 2000, // 2 seconds animation
    },
    {
        icon: Diamond,
        initialValue: 0,
        finalValue: 799103,
        suffix: "Diamonds & Jewelry",
        duration: 3000, // 3 seconds animation
    },
    {
        icon: Search, // Using Search icon from lucide-react
        initialValue: 0,
        finalValue: 1154,
        suffix: "+ Daily Searches",
        duration: 2500, // 2.5 seconds animation
    },
];

// Reusable Counter component with animation logic
const Counter = ({ initialValue, finalValue, duration, suffix, Icon }) => {
    const [count, setCount] = useState(initialValue);
    const [isStarted, setIsStarted] = useState(false);
    const ref = React.useRef(null);

    // Intersection Observer to start the count only when visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isStarted) {
                    setIsStarted(true);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, // Start when 50% of the component is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isStarted]);

    // Animation logic
    useEffect(() => {
        if (!isStarted) {
            setCount(initialValue); // Reset count if hidden
            return;
        }

        const startTime = Date.now();
        const endTime = startTime + duration;

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const timeElapsed = currentTime - startTime;
            
            if (currentTime < endTime) {
                const progress = timeElapsed / duration;
                // Cubic-out easing function
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                const currentValue = initialValue + easedProgress * (finalValue - initialValue);
                setCount(Math.round(currentValue));
            } else {
                setCount(finalValue);
                clearInterval(interval);
            }
        }, 10); // Update every 10ms for a smooth animation

        return () => clearInterval(interval);
    }, [finalValue, duration, initialValue, isStarted]);

    // Function to format numbers with commas
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <div ref={ref} className="flex flex-col items-center p-4">
            {/* Icon (Gold Color) */}
            <Icon size={40} className="text-gray-900 mb-6" /> 
            
            {/* Number (Dark Gray, Bold) */}
            <div className="text-4xl md:text-5xl font-extrabold font-sans text-gray-900 mb-2 tracking-tight">
                {formatNumber(count)}
                {/* Apply suffix dynamically for items like "10+" and "1,154+" */}
                {finalValue === 10 && "+"} 
                {finalValue === 1154 && "+"} 
            </div>
            
            {/* Label (Uppercase, Gray) */}
            <p className="text-gray-500 text-sm font-serif font-medium text-center uppercase tracking-widest">
                {suffix}
            </p>
        </div>
    );
};


// --- Hero Slide Data ---
const heroSlides = [
    {
        id: 1,
        title: "Discover Every Facet of Luxury",
        subtitle: "Exclusive, conflict-free diamonds & fine jewelry. Crafted for those who demand excellence.",
        ctaText: "Shop Diamonds",
        ctaLink: "/products",
        image: "https://wpbingo-adena.myshopify.com/cdn/shop/files/slider2-1.jpg?crop=center&height=960&v=1730091392&width=1920",
    },
    {
        id: 2,
        title: "The Solitaire Collection",
        subtitle: "Timeless elegance. Find the perfect piece to celebrate your most precious moments.",
        ctaText: "View Rings",
        ctaLink: "/shop/rings",
        image: "https://wpbingo-adena.myshopify.com/cdn/shop/files/slider5-1_5427c971-9eca-4354-85d8-fed90c27de63.jpg?crop=center&height=1064&v=1730453457&width=1920",
    },
];

// Mock data for features, products and testimonials
const features = [
    {
        icon: <Diamond size={32} />,
        title: "Ethically Sourced",
        desc: "Our diamonds are certified conflict-free and ethically sourced from responsible mines.",
    },
    {
        icon: <Star size={32} />,
        title: "Exceptional Clarity",
        desc: "Only the top 2% of stones make it to our premium luxury collection.",
    },
    {
        icon: <ChevronLeft size={32} />, // Re-adding an available icon for structure
        title: "Personalized Service",
        desc: "Get expert advice and tailored diamond recommendations.",
    },
];

// Mock data for the new category grid structure
// NOTE: Removed the 'link' property as it is now dynamically generated in the JSX
const categories = [
    {
        name: "Rings",
        // Image URL 1
        image: "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-12.jpg?crop=center&height=564&v=1730169525&width=461",
    },
    {
        name: "Necklace",
        // Image URL 2
        image: "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-13.png?crop=center&height=564&v=1730169526&width=461",
    },
    {
        name: "Bracelets",
        // Image URL 3
        image: "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-14.jpg?crop=center&height=564&v=1730169525&width=461",
    },
    {
        name: "Earring",
        // Image URL 4
        image: "https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-15.jpg?crop=center&height=564&v=1730169525&width=461",
    },
];

const testimonials = [
    {
        id: 1,
        quote: "Absolutely stunning craftsmanship—my wife adored the ring!",
        name: "James A.",
    },
    {
        id: 2,
        quote: "The quality and sparkle are unmatched. Highly recommended!",
        name: "Priya S.",
    },
];

export default function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const totalSlides = heroSlides.length;

    // State and Ref for custom video controls
    const videoRef = useRef(null);
    // Start true because autoPlay is enabled on the video element
    const [isPlaying, setIsPlaying] = useState(true); 

    // Function to toggle play/pause
    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                // Must call play() inside a user interaction handler for most browsers
                videoRef.current.play(); 
            }
            setIsPlaying(!isPlaying);
        }
    };
    
    // Listen for external play/pause events (e.g., if user right-clicks and pauses)
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);

        return () => {
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
        };
    }, []);
    // --- End Video Control Logic ---


    // --- Drag/Swipe State ---
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragThreshold = 50; // Minimum distance in pixels to trigger a slide change
    const heroRef = useRef(null);
    // --- End Drag/Swipe State ---


    // Function to handle slide change with transition state
    const changeSlide = (newIndex) => {
        if (isTransitioning) return; // Prevent rapid clicking

        setIsTransitioning(true);
        // Wait for the fade-out/move transition to complete (duration-500)
        setTimeout(() => {
            setCurrentSlide(newIndex);
        }, 500); // Must match the content transition duration (duration-500)
    }

    const nextSlide = () => {
        const newIndex = (currentSlide + 1) % totalSlides;
        changeSlide(newIndex);
    };

    const prevSlide = () => { 
        const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        changeSlide(newIndex);
    };

    // Automatic slide cycling effect
    useEffect(() => {
        // Current interval is 4000ms (4 seconds)
        const slideTimer = setInterval(nextSlide, 4000); 
        return () => clearInterval(slideTimer); // Cleanup on unmount
    }, [currentSlide]); // Dependency on currentSlide to reset the timer after manual navigation

    // Effect to manage the end of the transition (fade-in completed)
    useEffect(() => {
        if (isTransitioning) {
            // Once currentSlide is updated, we wait for the fade-in (duration-500) to complete
            const transitionInTimer = setTimeout(() => {
                setIsTransitioning(false);
            }, 500);
            return () => clearTimeout(transitionInTimer);
        }
    }, [currentSlide, isTransitioning]);

    // --- Drag/Swipe Handlers ---

    // Unified start handler for both mouse and touch
    const handleDragStart = (e) => {
        // Prevent default behavior for touch events to avoid scrolling conflicts
        if (e.type === 'touchstart') {
            e.preventDefault(); 
        }
        setIsDragging(true);
        // Get the starting X coordinate, handling both mouse and touch
        setStartX(e.clientX || e.touches[0].clientX); 
    };

    // Unified end handler for both mouse and touch
    const handleDragEnd = (e) => {
        if (!isDragging) return;
        setIsDragging(false);

        // Get the end X coordinate from mouse or touch
        // Use e.clientX for mouseup, or e.changedTouches[0].clientX for touchend
        const endX = e.clientX || (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : startX);
        const diffX = startX - endX; // Positive if swiped left (next slide), negative if swiped right (prev slide)

        if (diffX > dragThreshold) {
            // Swiped left
            nextSlide();
        } else if (diffX < -dragThreshold) {
            // Swiped right
            prevSlide();
        }
    };

    // Unified move handler for mouse (only when dragging)
    const handleDragMove = (e) => {
        if (!isDragging) return;
        // Prevent selection when dragging on desktop
        e.preventDefault(); 
    };
    
    // TouchMove handler (important for mobile)
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        // Allows default scroll behavior if needed, but the important logic is in handleDragEnd.
    };

    // Effect to attach global drag-end listener for mouse events
    // This handles the case where the mouse is released outside the slider area
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', handleDragEnd);
        } else {
            window.removeEventListener('mouseup', handleDragEnd);
        }
        // Cleanup function
        return () => {
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, startX, nextSlide, prevSlide, handleDragEnd]); // Added dependencies to satisfy React hooks rules
    
    // --- End Drag/Swipe Handlers ---

    const slide = heroSlides[currentSlide];
    
    // Determine transition classes based on state
    const contentClasses = isTransitioning 
        ? 'opacity-0 translate-y-4' // Hidden and slightly offset during transition
        : 'opacity-100 translate-y-0'; // Fully visible and in position

    return (
        <div className="w-full pt-0">
            {/* Hero Section (Slider) */}
            <section 
                ref={heroRef}
                // Attach drag/swipe event handlers to the section
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
                onMouseMove={handleDragMove}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleDragEnd}
                // Added drag styles/classes: select-none prevents text selection, cursor-grab provides feedback
                className={`relative h-[600px] flex items-center justify-center transition-all duration-500 ease-in-out overflow-hidden select-none cursor-grab active:cursor-grabbing`}
            >
                {/* --- MODIFICATION START: Cross-fade image transition --- */}
                {heroSlides.map((s, index) => (
                    <img
                        key={s.id} // Key is maintained for React's reconciliation process in the map
                        src={s.image}
                        alt={s.title}
                        // duration-1000 for a slow, smooth cross-fade effect.
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out pointer-events-none ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1200x600/1E40AF/ffffff?text=Hero+Image" }}
                    />
                ))}
                {/* --- MODIFICATION END --- */}
                
                {/* Content (Z-index 10 to ensure it is always above the images) */}
                <div className={`relative z-10 text-center max-w-2xl mx-auto px-4 transition-all duration-500 ${contentClasses}`}>
                    <h1 className="text-gray-900 text-5xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
                        {slide.title}
                    </h1>
                    <p className="text-gray-700 font-inter text-xl mb-8">
                        {slide.subtitle}
                    </p>
                    <a
                        href={slide.ctaLink}
                        // Added cursor-pointer class here
                        className="bg-[#D4AF37] text-white text-lg font-semibold rounded-full px-12 py-4 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 uppercase tracking-wider cursor-pointer"
                    >
                        {slide.ctaText}
                    </a>
                </div>
                
                {/* Slide Indicators (Dots at the bottom) */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            // Added cursor-pointer class here
                            onClick={() => changeSlide(index)} 
                            aria-label={`Go to slide ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                // Active dot is dark gray, inactive is light gray transparent
                                index === currentSlide ? 'bg-gray-900 scale-125' : 'bg-gray-500/50 hover:bg-gray-900/80'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* --- UPDATED STATS COUNTER SECTION (Light Theme) --- */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">
                    {/* The "Now on MRM IMPEX" style text */}
                    <p className="text-center text-sm font-semibold text-gray-700 uppercase tracking-widest mb-2">
                        Now on MRM IMPEX
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-gray-200 py-10">
                        {stats.map((stat, index) => (
                            // Counter component now starts animation when visible
                            <Counter 
                                key={index}
                                Icon={stat.icon}
                                initialValue={stat.initialValue}
                                finalValue={stat.finalValue}
                                duration={stat.duration}
                                suffix={stat.suffix}
                            />
                        ))}
                    </div>
                </div>
            </section>
            {/* --- END UPDATED STATS COUNTER SECTION --- */}

            {/* --- FEATURED CATEGORIES SECTION (Updated Link Logic) --- */}
            <section className="py-16 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-800 mb-12">
                    View by Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <a
                            key={category.name}
                            // *** MODIFICATION: Redirects to /product with the category name as a query parameter ***
                            href={`/product?category=${category.name.toLowerCase().replace(/\s/g, '-')}`}
                            // The category link should also have a cursor pointer
                            className="relative aspect-[4/5] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" 
                        >
                            {/* Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                // Added an onError handler just in case the external URLs fail to load
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x750/C0C9D0/000000?text=Image+Load+Error" }}
                            />
                            
                            {/* Overlay for Text - Removed dark background and changed text color for visibility */}
                            <div className="absolute inset-0 flex items-end p-6">
                                <h3 className="text-gray-900 text-3xl font-serif font-bold">
                                    {category.name}
                                </h3>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
            {/* --- END FEATURED CATEGORIES SECTION --- */}

            {/* --- VIDEO PROMOTION SECTION (Custom Play/Pause Controls) --- */}
            <section className="py-16 px-0"> 
                <div className="relative w-full aspect-[3/1] rounded-none overflow-hidden shadow-2xl">
                    <video 
                        // Set ref for programmatic control
                        ref={videoRef}
                        // Removed controls attribute
                        autoPlay // Video plays by default
                        muted    // Required for autoplay in most browsers
                        loop 
                        className="w-full h-full object-cover" 
                        poster="https://wpbingo-adena.myshopify.com/cdn/shop/files/banner-10.jpg?crop=center&height=564&v=1730169524&width=1160"
                    >
                        {/* !!! UPDATED VIDEO SOURCE HERE !!! */}
                        <source 
                            src="https://cdn.pixabay.com/video/2024/07/03/219228_large.mp4" 
                            type="video/mp4" 
                        />
                        Your browser does not support the video tag.
                    </video>

                    {/* Custom Play/Pause Button */}
                    <button 
                        onClick={togglePlayPause} 
                        aria-label={isPlaying ? "Pause Video" : "Play Video"}
                        className="absolute inset-0 flex items-center justify-center bg-gray-900/10 hover:bg-gray-900/20 transition duration-300 group"
                    >
                        {isPlaying ? (
                            <PauseCircle 
                                size={96} 
                                className="text-white opacity-90 transition-opacity drop-shadow-lg group-hover:opacity-100"
                            />
                        ) : (
                            <PlayCircle 
                                size={96} 
                                className="text-white opacity-90 transition-opacity drop-shadow-lg group-hover:opacity-100"
                            />
                        )}
                    </button>
                </div>
            </section>
            {/* --- END VIDEO PROMOTION SECTION --- */}

            {/* Features Section - Moved after categories to match typical e-commerce flow */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-4">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="flex flex-col items-center text-center gap-4"
                        >
                            <div className="text-[#D4AF37]">{f.icon}</div>
                            <h3 className="text-2xl font-serif font-bold text-[#0F172A]">
                                {f.title}
                            </h3>
                            <p className="text-[#94A3B8] font-inter text-base">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-[#F8FAFC] py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A] mb-8">
                        Client Testimonials
                    </h3>
                    <div className="flex flex-col md:flex-row justify-center gap-8">
                        {testimonials.map((t) => (
                            <blockquote
                                key={t.id}
                                className="bg-white rounded-xl shadow-lg p-6 italic text-[#525252] font-light max-w-sm mx-auto border-t-4 border-[#D4AF37]"
                            >
                                "{t.quote}"
                                <footer className="mt-4 text-[#D4AF37] font-semibold not-italic">
                                    - {t.name}
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#D4AF37] py-12 text-center">
                <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A] mb-4">
                    Experience Diamond Luxury{" "}
                    <span className="font-inter">— Shop Today</span>
                </h4>
                <a
                    href="/contact"
                    className="bg-white text-[#1E40AF] font-semibold rounded-full px-10 py-3 shadow-lg hover:scale-105 hover:bg-[#F8FAFC] transition-all duration-300 uppercase tracking-wider cursor-pointer"
                >
                    Contact Us
                </a>
            </section>
        </div>
    );
}
