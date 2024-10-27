import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import Nyan from './Image/nyan2.png';
import Loading from './Loading';
import { useMediaQuery } from 'react-responsive';


const Home = () => {
    const [ongoingData, setOngoingData] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [popularData, setPopularData] = useState([]);
    const [finishedData, setFinishedData] = useState([]);
    const [seasonData, setSeasonData] = useState({});
    const [animeDetails, setAnimeDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [detailsLoading, setDetailsLoading] = useState(true);
    const [actionData, setActionData] = useState({});
    const [comedyData, setComedyData] = useState({});
    const [romanceData, setRomanceData] = useState({});
    const [trendingAnime, setTrendingAnime] = useState({});
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    const itemsPerPage = isMobile ? 1 : isTablet ? 3 : 5;
    const text = isMobile ? 250 : isTablet ? 250 : 500;


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ongoingRes, popularRes, movieRes, finishedRes, seasonRes, actionRes, comedyRes, romanceRes, trendingAnimeRes] = await Promise.all([
                    axios.get('https://api.aninyan.com/anime/ongoing?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/properties/season/fall-2024?order_by=popular&page=1'),
                    axios.get('https://api.aninyan.com/anime/movie?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/finished?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/properties/season/fall-2024?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/properties/genre/action?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/properties/genre/comedy?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/properties/genre/romance?order_by=updated&page=1'),
                    axios.get('https://api.aninyan.com/anime/properties/season/fall-2024?order_by=most_viewed&page=1')
                ]);

                setOngoingData(ongoingRes.data.ongoingAnime);
                setPopularData(popularRes.data.propertiesDetails);
                setMovieData(movieRes.data.movieAnime);
                setSeasonData(seasonRes.data.propertiesDetails);
                setFinishedData(finishedRes.data.finishedAnime);
                setActionData(actionRes.data.propertiesDetails);
                setComedyData(comedyRes.data.propertiesDetails);
                setRomanceData(romanceRes.data.propertiesDetails);
                setTrendingAnime(trendingAnimeRes.data.propertiesDetails);

                const topThreeData = popularRes.data.propertiesDetails.slice(0, 6);
                const requests = topThreeData.map((anime) => {
                    const { animeCode, animeId } = anime;
                    return axios.get(`https://api.aninyan.com/anime/${animeCode}/${animeId}`)
                        .then((response) => ({
                            animeCode,
                            details: response.data.animeDetails,
                        }));
                });

                const results = await Promise.all(requests);
                const details = results.reduce((acc, { animeCode, details }) => {
                    acc[animeCode] = details;
                    return acc;
                }, {});

                setAnimeDetails(details);
                setDetailsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setDetailsLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const truncateText = (text = '', maxLength) => {
        if (typeof text !== 'string') {
            return '';
        }
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    if (loading || detailsLoading) {
        return <Loading />;
    }

    const renderOngoingItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.episode}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderSeasonItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderFinishedItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/4 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.score}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderActionItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderComedyItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderRomanceItem = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    const renderTrendingAnime = (res) => (
        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='flex-none w-full sm:w-1/4 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
        </Link>
    );

    function filterText(text) {
        const filterPattern = /\(Sumber:.*$/;
        return text.replace(filterPattern, '').trim();
    }

    const renderPopularItem = (res) => {
        const details = animeDetails[res.animeCode] || {};

        return (
            <div className='relative w-full bg-white shadow overflow-hidden'>
                <img className='absolute inset-0 sm:h-[32rem] w-full object-cover' src={res.image} alt={res.title} />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent mix-blend-multiply'></div>
                <div className='relative flex top-1/2 left-0 px-8 sm:px-40 py-20 sm:py-8 transform -translate-y-1/2 leading-8 sm:leading-10 gap-20 items-center z-10'>
                    <img className='hidden sm:block h-[32rem] rounded-lg object-cover m-10 transform rotate-12 shadow-lg shadow-yellow-300' src={res.image} alt={res.title} />
                    <div className='text-white'>
                        <span className='sm:text-xl font-black'>{res.title}</span><br />
                        <span className='sm:text-lg font-bold text-gray-400'>{res.ratings}</span><span className='text-white'> | </span>
                        <span className='sm:text-lg font-bold text-gray-400'>{res.type.join(', ')}</span><br />
                        <p className='sm:text-lg'>{truncateText(filterText(details.synopsis), text)}</p>
                        <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId} className='block mt-5'>
                            <button className='flex flex-row items-center bgColorSecond text-black rounded-lg px-4 py-2 font-semibold duration-300 hover:scale-125'>
                                <svg
                                    className='w-6 h-6'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 3l14 9-14 9V3z'></path>
                                </svg>
                                Watch Now!</button>
                        </Link>
                    </div>
                </div>
            </div>

        );
    };

    return (
        <div className='bgColorPrimary3 dark:bg-black'>
            <div className='relative overflow-hidden'>
                <Slider
                    data={popularData.slice(0, 6)}
                    itemsPerPage={1}
                    renderItem={renderPopularItem}
                    autoPlayInterval={7000}
                />
            </div>

            <div className='pt-16 sm:pt-36 sm:pb-16 sm:px-40'>
                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <div className='font-black dark:text-white sm:text-2xl w-1/2'>
                                <h3>Ongoing Anime</h3>
                            </div>
                            <Link to="/more/ongoing?data=ongoingAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>
                                    View More
                                </button>
                            </Link>
                        </div>
                    </div>


                    <Slider
                        data={ongoingData}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderOngoingItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Fall 2024</h3>
                            <Link to="/more/season/fall-2024?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={seasonData}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderSeasonItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Action Anime</h3>
                            <Link to="/more/genre/action?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={actionData}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderActionItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Comedy Anime</h3>
                            <Link to="/more/genre/comedy?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={comedyData}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderComedyItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Romance Anime</h3>
                            <Link to="/more/genre/romance?data=propertiesDetails">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={romanceData}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderRomanceItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Finished Anime</h3>
                            <Link to="/more/finished?data=finishedAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <Slider
                        data={finishedData}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderFinishedItem}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Trending Anime</h3>
                            <Link to="/more/season/fall-2024?data=propertiesDetails&trending=true">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <Slider
                        data={trendingAnime}
                        itemsPerPage={itemsPerPage}
                        renderItem={renderTrendingAnime}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-8 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-5'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Movies Anime</h3>
                            <Link to="/more/movie?data=movieAnime">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 mb-8'>
                        {movieData.slice(0, 8).map((res) => (
                            <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                    <img className='h-32 sm:h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                    <h3 className='absolute bottom-0 left-0 px-2 py-2 text-xs sm:text-md font-semibold text-white'>{truncateText(res.title, 20)}</h3>
                                    <div className='absolute top-0 left-0 px-2 py-2'>
                                        <span className='text-xs font-semibold bg-yellow-100 rounded-lg px-2'>{res.score}</span>
                                        <span className='text-xs font-semibold bg-yellow-300 rounded-lg px-2 mx-2'>{res.type}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-center items-center w-full'>
                <img src={Nyan} alt='Nyan' className='w-40 sm:w-96 mx-auto' />
            </div>
        </div>
    );
};

export default Home;
