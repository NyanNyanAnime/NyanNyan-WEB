const VideoPlayer = ({ videoUrl }) => {
    return (
        <div>
            <iframe
                src={videoUrl}
                width="100%"
                height="500"
                frameBorder="0"
                allowFullScreen
                title="Video Player"
            ></iframe>
        </div>
    );
};

export default VideoPlayer;