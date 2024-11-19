import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import Loading from './Loading';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from './VideoPlayer';


const Video = () => {
    const location = useLocation();
    const { animeId } = location.state || {};
    const { episodeId } = useParams();
    const navigate = useNavigate();
    const [episode, setEpisode] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [animeData, setAnimeData] = useState([]);
    const [episodeList, setEpisodeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const episodeRes = await axios.get(`https://api.aninyan.com/anime/episode/${episodeId}`);
                setEpisode(episodeRes.data.data);

                const urlDetails = `https://api.aninyan.com/anime/details/${animeId}`
                const animeRes = await axios.get(`https://api.aninyan.com/anime/details/${animeId}`);
                setAnimeData(animeRes.data.data);
                setEpisodeList(animeRes.data.episode_list);

                console.log(urlDetails)
                if (episodeRes) {
                    const mirrorEmbed = episodeRes.data.data.mirror_embed2;
                    if (mirrorEmbed.streaming.length > 0) {
                        setSelectedVideo(mirrorEmbed.streaming[0].link);
                    }
                }
            } catch (err) {
                console.error('Error fetching episode details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [animeId, episodeId]);

    // const handleVideoChange = (e) => {
    //     const selectedUrl = e.target.value;
    //     const video = videoList.find(v => v.url === selectedUrl);
    //     if (video) {
    //         setSelectedVideo(video);
    //     } else {
    //         console.error('Video not found for URL:', selectedUrl);
    //     }
    // };

    const handleNavigateEpisode = (linkRef) => {
        navigate(`/anime/episode/${linkRef}`);
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
                <div className="w-full h-auto rounded-lg">
                    {selectedVideo && <VideoPlayer videoUrl={selectedVideo} />}
                </div>

                <div className="mt-4 px-2 sm:px-0">
                    {/* <select
                        className="px-4 py-2 mr-2 bgColorSecond active:bg-yellow-100 dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg"
                        onChange={handleVideoChange}
                        value={selectedVideo ? selectedVideo.url : ''}
                    >
                        {videoList.length > 0 ? videoList.map((video, index) => (
                            <option key={index} value={video.url}>
                                {video.size}
                            </option>
                        )) : <option>No videos available</option>}
                    </select> */}

                    {episode?.relative?.[0]?.link_ref && (
                        <button
                            className="px-4 py-2 mr-2 bgColorSecond dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg"
                            onClick={() => handleNavigateEpisode(episode.relative[0].link_ref)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                    )}
                    {episode?.relative?.[2]?.link_ref && (
                        <button
                            className="px-4 py-2 bgColorSecond dark:bg-black dark:outline dark:outline-3 dark:outline-yellow-500 dark:text-white dark:hover:bg-yellow-500 rounded-lg"
                            onClick={() => handleNavigateEpisode(episode.relative[2].link_ref)}
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
                                {episodeList
                                    ?.map((episode) => {
                                        const match = episode.episode_title.match(/Episode\s(\d+)/i);
                                        const episodeNumber = match ? parseInt(match[1]) : 0;

                                        return {
                                            ...episode,
                                            episodeNumber,
                                        };
                                    })
                                    .sort((a, b) => a.episodeNumber - b.episodeNumber)
                                    .map((episode, index) => (
                                        <Link
                                            key={index}
                                            to={`/anime/episode/${episode.episode_id}`}
                                            className="bg-yellow-100 p-1 flex flex-row shadow-md font-bold rounded-lg items-center text-center justify-center hover:text-white hover:bg-yellow-500 transition-colors"
                                        >
                                            {episode.episodeNumber}
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className='pt-10 dark:text-white px-4 sm:px-0'>
                    <div className='flex flex-row items-center gap-4'>
                        <img src={animeData.image} alt='Anime Image' className='h-32 w-32 rounded-lg' />

                        <div>
                            <h1 className="text-l lg:text-2xl mb-2 font-black text-gray-600 dark:text-white">{animeData.title}</h1>
                            <span className='font-semibold'>{animeData.title}</span><span> | </span><span className='font-semibold'>Episode {episodeId.match(/episode-(\d+)/)[1]} </span><br />
                        </div>
                    </div>
                    <h5 className='pt-4 font-semibold'>Synopsis :</h5>
                    <p>{animeData.sinopsis}</p>
                </div>
                <div className='mt-10 shadow-md py-6 px-4 dark:bg-gray-900 rounded-lg sm:w-3/4'>
                    <h3 className='font-semibold mb-4 dark:text-white'>Download Link : </h3>
                    {episode?.download_links?.mp4 && Object.entries(episode.download_links.mp4).map(([quality, links], index) => (
                        links.length > 0 && (
                            <div key={index} className='mb-10'>
                                <h3 className='mb-4 font-black dark:text-white'>{quality}</h3>
                                <hr className='w-full sm:w-2/3 h-1 bg-yellow-500 mb-6' />
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {links.slice(0, 6).map((download, linkIndex) => (
                                        <Link
                                            key={linkIndex}
                                            to={download.link}
                                            target='_blank'
                                            className="bg-yellow-100 text-sm px-4 py-2 shadow-md font-bold rounded-lg hover:text-white hover:bg-yellow-500 transition-colors"
                                        >
                                            <button>
                                                {download.host} ({download.size})
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
                    {episodeList
                        ?.map((episode) => {
                            const match = episode.episode_title.match(/Episode\s(\d+)/i);
                            const episodeNumber = match ? parseInt(match[1]) : 0;

                            return {
                                ...episode,
                                episodeNumber,
                            };
                        })
                        .sort((a, b) => a.episodeNumber - b.episodeNumber)
                        .map((episode, index) => (
                            <Link
                                key={index}
                                to={`/anime/episode/${episode.episode_id}`}
                                state={{ animeId }}
                                className="bg-yellow-100 p-1 flex flex-row shadow-md font-bold rounded-lg items-center text-center justify-center hover:text-white hover:bg-yellow-500 transition-colors"
                            >
                                {episode.episodeNumber}
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Video;
