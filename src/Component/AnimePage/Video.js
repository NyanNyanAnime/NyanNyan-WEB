import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const Video = () => {
    const { animeCode, animeId, episodeNumber } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [animeData, setAnimeData] = useState({ episodeList: [] });
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const episodeRes = await axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}/${episodeNumber}`);
                setEpisode(episodeRes.data);
                setVideoList(episodeRes.data.videoList);

                const animeRes = await axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}`);
                setAnimeData(animeRes.data.animeDetails);
                setSelectedVideo(episodeRes.data.videoList[0]);
            } catch (err) {
                console.error('Error fetching episode details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [animeCode, animeId, episodeNumber]);

    const handleVideoChange = (e) => {
        const selectedUrl = e.target.value;
        const video = videoList.find(v => v.url === selectedUrl);
        if (video) {
            setSelectedVideo(video);
        } else {
            console.error('Video not found for URL:', selectedUrl);
        }
    };

    const handleNavigateEpisode = (targetEpisode) => {
        navigate(`/anime/${animeCode}/${animeId}/${targetEpisode}`);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-row bgColorPrimary3 dark:bg-black py-8 sm:py-20 lg:px-40 gap-4">
            <div className='sm:w-4/5'>
                <video className="w-full h-auto rounded-lg" controls key={selectedVideo ? selectedVideo.url : ''}>
                    <source src={selectedVideo ? selectedVideo.url : ''} type={selectedVideo ? selectedVideo.type : ''} />
                </video>
                <div className="mt-4 px-2 sm:px-0">
                    <select
                        className="px-4 py-2 mr-2 bgColorSecond active:bg-yellow-100 dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg"
                        onChange={handleVideoChange}
                        value={selectedVideo ? selectedVideo.url : ''}
                    >
                        {videoList.length > 0 ? videoList.map((video, index) => (
                            <option key={index} value={video.url}>
                                {video.size}
                            </option>
                        )) : <option>No videos available</option>}
                    </select>

                    {episode.prevEpisodeNumber && (
                        <button
                            className="px-4 py-2 mr-2 bgColorSecond dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg"
                            onClick={() => handleNavigateEpisode(episode.prevEpisodeNumber)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    )}

                    {episode.nextEpisodeNumber && (
                        <button
                            className="px-4 py-2 bgColorSecond dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg"
                            onClick={() => handleNavigateEpisode(episode.nextEpisodeNumber)}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    )}
                </div>
                <div className='sm:hidden w-full'>
                    <button
                        onClick={toggleDropdown}
                        className='w-full bgColorPrimary3 dark:bg-gray-900 px-2 pt-2 mt-4 rounded-lg flex items-center shadow-md pb-2 mb-4 justify-between'
                    >
                        <h2 className="text-lg lg:text-xl px-4 py-2 bgColorSecond dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg">
                            Episode
                        </h2>
                        <FontAwesomeIcon icon={isDropdownOpen ? faCaretUp : faCaretDown} className='dark:text-white' />
                    </button>

                    {isDropdownOpen && (
                        <div className='bgColorPrimary3 dark:bg-gray-900 p-5 rounded-lg shadow-md mt-2'>
                            <div className="grid grid-cols-3 gap-2">
                                {animeData.episodeList.map((episode, index) => {
                                    const episodeNumber = episode.title.match(/\d+/)?.[0] || index + 1;

                                    return (
                                        <Link
                                            key={index}
                                            to={`/anime/${animeCode}/${animeId}/${episodeNumber}`}
                                            className="bg-yellow-100 p-1 flex flex-row shadow-md font-bold rounded-lg items-center text-center justify-center hover:text-white hover:bg-yellow-500 transition-colors"
                                        >
                                            {episode.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className='pt-10 dark:text-white px-4 sm:px-0'>
                    <div className='flex flex-row items-center gap-4'>
                        <img src={animeData.image} alt='Anime Image' className='h-32 w-32 rounded-lg' />

                        <div>
                            <h1 className="text-l lg:text-2xl mb-2 font-black text-gray-600 dark:text-white">{animeData.title}</h1>
                            <span className='font-semibold'>{animeData.type}</span><span> | </span><span className='font-semibold'>Episode {episodeNumber}</span><br />
                        </div>
                    </div>
                    <h5 className='pt-4 font-semibold'>Synopsis :</h5>
                    <p>{animeData.synopsis}</p>
                </div>
                <div className='mt-10 shadow-md py-6 px-4'>
                    <h3 className='font-semibold mb-4 dark:text-white'>Download Link : </h3>
                    {episode?.downloadLinks?.map((downloadItem, index) => (
                        downloadItem.links?.length > 0 && (
                            <div key={index} className='mb-10'>
                                <h3 className='mb-4 font-black dark:text-white'>{downloadItem.quality}</h3>
                                <hr className='w-full sm:w-2/3 h-1 bg-yellow-500 mb-6' />
                                <div className="flex flex-wrap gap-2">
                                    {downloadItem.links.slice(0, 6).map((download, linkIndex) => (
                                        <Link
                                            key={linkIndex}
                                            to={download.url}
                                            target='_blank'
                                            className="bg-yellow-100 text-lg px-4 py-2 shadow-md font-bold rounded-lg hover:text-white hover:bg-yellow-500 transition-colors"
                                        >
                                            <button>
                                                {download.title}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}

                </div>
            </div>
            <div className='hidden sm:block w-1/5 bgColorPrimary3 dark:bg-gray-900 p-5 rounded-lg h-96 shadow-md overflow-y-auto'>
                <h2 className="text-lg lg:text-xl mb-8 bgColorSecond dark:text-gray-800 font-bold text-center rounded-lg px-3 py-1">
                    Episode
                </h2>
                <div className="flex gap-2 grid grid-cols-3">
                    {animeData.episodeList.map((episode, index) => {
                        const episodeNumber = episode.title.match(/\d+/)?.[0] || index + 1;

                        return (
                            <Link
                                key={index}
                                to={`/anime/${animeCode}/${animeId}/${episodeNumber}`}
                                className="bg-yellow-100 p-1 flex flex-row shadow-md font-bold rounded-lg items-center text-center justify-center hover:text-white hover:bg-yellow-500 transition-colors"
                            >
                                {episode.title}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Video;
