import React, { useRef } from 'react';

const VideoPlayer = ({ selectedVideo }) => {
    const videoRef = useRef(null);

    const handleForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const handleRewind = () => {
        if (videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };

    return (
        <div className="relative">
            <video
                ref={videoRef}
                className="w-full h-auto rounded-lg"
                controls
                key={selectedVideo ? selectedVideo.url : ''}
            >
                <source
                    src={selectedVideo ? selectedVideo.url : ''}
                    type={selectedVideo ? selectedVideo.type : ''}
                />
            </video>
            <div className="absolute bottom-4 left-4 flex gap-4">
                <button
                    onClick={handleRewind}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                    -10s
                </button>
                <button
                    onClick={handleForward}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                    +10s
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;
