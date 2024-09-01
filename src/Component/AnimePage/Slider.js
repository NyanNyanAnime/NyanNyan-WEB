import React, { useState, useEffect, useRef } from 'react';

const Slider = ({ data, itemsPerPage, renderItem, onNext, onPrev, autoPlayInterval }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const startXRef = useRef(0);
    const [touching, setTouching] = useState(false);

    const totalSlides = Math.ceil(data.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
        if (onNext) onNext();
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
        if (onPrev) onPrev();
    };

    useEffect(() => {
        let interval;
        if (autoPlayInterval) {
            interval = setInterval(nextSlide, autoPlayInterval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [autoPlayInterval, nextSlide]);

    const handleTouchStart = (e) => {
        startXRef.current = e.touches[0].clientX;
        setTouching(true);
    };

    const handleTouchMove = (e) => {
        if (!touching) return;
        const deltaX = e.touches[0].clientX - startXRef.current;
        if (deltaX < -50) { // Swipe left
            nextSlide();
            setTouching(false);
        } else if (deltaX > 50) { // Swipe right
            prevSlide();
            setTouching(false);
        }
    };

    const handleTouchEnd = () => {
        setTouching(false);
    };

    const handleMouseDown = (e) => {
        startXRef.current = e.clientX;
        setTouching(true);
    };

    const handleMouseMove = (e) => {
        if (!touching) return;
        const deltaX = e.clientX - startXRef.current;
        if (deltaX < -50) { // Swipe left
            nextSlide();
            setTouching(false);
        } else if (deltaX > 50) { // Swipe right
            prevSlide();
            setTouching(false);
        }
    };

    const handleMouseUp = () => {
        setTouching(false);
    };

    return (
        <div
            className='relative'
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Ensure to handle mouse leaving the area
        >
            <div className='overflow-hidden'>
                <div
                    className='flex'
                    style={{
                        width: `${totalSlides * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                        transition: 'transform 0.5s ease',
                    }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div
                            key={slideIndex}
                            className='flex justify-center sm:justify-start'
                            style={{ width: `${100 / totalSlides}%` }}
                        >
                            {data.slice(slideIndex * itemsPerPage, (slideIndex + 1) * itemsPerPage).map(renderItem)}
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={prevSlide} className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full font-black opacity-60 hover:opacity-80'>
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path>
                </svg>
            </button>
            <button onClick={nextSlide} className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full font-black opacity-60 hover:opacity-80'>
                <svg
                    className='w-6 h-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
                </svg>
            </button>
        </div>
    );
};

export default Slider;
