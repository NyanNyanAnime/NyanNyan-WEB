import React, { useRef, useState, useEffect } from 'react';

const VideoPlayer = ({ videoSrc }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        const video = videoRef.current;
        video.addEventListener('loadedmetadata', () => {
            setDuration(video.duration);
        });

        const drawFrame = () => {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);
            if (isPlaying) {
                requestAnimationFrame(drawFrame);
            }
        };

        if (isPlaying) {
            video.play();
            drawFrame();
        } else {
            video.pause();
        }
    }, [isPlaying]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        const newTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    return (
        <div className="relative w-full h-96 bg-black">
            {/* Canvas for video rendering */}
            <canvas ref={canvasRef} className="w-full h-full"></canvas>
            <video
                ref={videoRef}
                src={videoSrc}
                className="hidden"
                onTimeUpdate={handleTimeUpdate}
            ></video>
            {/* Custom controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                <div className="flex justify-between items-center">
                    <button onClick={handlePlayPause} className="text-xl">
                        {isPlaying ? '❚❚' : '►'}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 mx-4"
                    />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
