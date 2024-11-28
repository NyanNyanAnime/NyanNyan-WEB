import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import Nyan from './Image/nyan2.png';
import Loading from './Loading';
import { useMediaQuery } from 'react-responsive';


const Home = () => {
    const [ongoingData, setOngoingData] = useState([]);
    const [animeDetails, setAnimeDetails] = useState([]);
    const [finishedData, setFinishedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionData, setActionData] = useState([]);
    const [adventureData, setAdventureData] = useState([]);
    const [comedyData, setComedyData] = useState([]);
    const [romanceData, setRomanceData] = useState([]);
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

    const itemsPerPage = isMobile ? 1 : isTablet ? 3 : 5;
    const text = isMobile ? 250 : isTablet ? 250 : 500;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ongoingRes, finishedRes, actionRes, comedyRes, romanceRes, adventureRes] = await Promise.all([
                    axios.get('https://api.aninyan.com/anime/ongoing/1'),
                    axios.get('https://api.aninyan.com/anime/finished/1'),
                    axios.get('https://api.aninyan.com/anime/genres/action/1'),
                    axios.get('https://api.aninyan.com/anime/genres/comedy/1'),
                    axios.get('https://api.aninyan.com/anime/genres/romance/1'),
                    axios.get('https://api.aninyan.com/anime/genres/adventure/1'),
                ]);

                setOngoingData(ongoingRes.data);
                setFinishedData(finishedRes.data);
                setActionData(actionRes.data);
                setComedyData(comedyRes.data);
                setRomanceData(romanceRes.data);
                setAdventureData(adventureRes.data);

                const animeIds = ongoingRes.data.data.slice(0, 6).map(item => item.anime_id);

                const detailRequests = animeIds.map(id =>
                    axios.get(`https://api.aninyan.com/anime/details/${id}`)
                );

                const detailResponses = await Promise.all(detailRequests);

                const details = detailResponses.map((res, index) => ({
                    ...res.data.data,
                    anime_id: animeIds[index]
                }));

                setAnimeDetails(details);

                console.log('Anime details fetched:', animeDetails);
                console.log('Anime details fetched:', ongoingData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || !animeDetails || animeDetails.length === 0) {
        return <Loading />;
    }

    const truncateText = (text = '', maxLength) => {
        if (typeof text !== 'string') {
            return '';
        }
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const ongoingAnime = (res) => (
        <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.episode}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
            <h3 className='text-md rounded-sm text-gray-500 font-semibold'>Update Day: {res.updated_day}</h3>
        </Link>
    );

    const adventureAnime = (res) => (
        <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.score}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const actionAnime = (res) => (
        <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const comedyAnime = (res) => (
        <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const romanceAnime = (res) => (
        <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id} className='flex-none w-full sm:w-1/5 p-4'>
            <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                <img className='h-80 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
            </div>
            <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 20)}</h1>
        </Link>
    );

    const slider = (res) => {
        const combinedSinopsis = Array.isArray(res.sinopsis)
            ? res.sinopsis.join(' ')
            : res.sinopsis;

        return (
            <div className='relative w-full bg-white shadow overflow-hidden'>
                <img className='absolute inset-0 sm:h-[32rem] w-full object-cover' src={res.image} alt={res.title} />
                <div className='absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent mix-blend-multiply'></div>
                <div className='relative flex top-1/2 left-0 px-8 sm:px-40 py-20 sm:py-8 transform -translate-y-1/2 leading-8 sm:leading-10 gap-20 items-center z-10'>
                    <img className='hidden sm:block h-[32rem] rounded-lg object-cover m-10 transform rotate-12 shadow-lg shadow-yellow-300' src={res.image} alt={res.title} />
                    <div className='text-white'>
                        <span className='sm:text-xl font-black'>{res.title}</span><br />
                        <span className='sm:text-lg font-bold text-gray-400'>{res.score}</span><span className='text-white'> | </span>
                        <span className='sm:text-lg font-bold text-gray-400'>{res.genres.join(', ')}</span><br />
                        <p className='sm:text-lg'>{truncateText(combinedSinopsis, text)}</p>

                        <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id} className='block mt-5'>
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
                                Watch Now!
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='bgColorPrimary3 dark:bg-black'>
            <div className='relative overflow-hidden'>
                {animeDetails && animeDetails.length > 0 && (
                    <Slider
                        data={animeDetails}
                        itemsPerPage={1}
                        renderItem={slider}
                        autoPlayInterval={7000}
                    />
                )}
            </div>
            <div className='pt-16 sm:pt-36 sm:pb-16 sm:px-40'>
                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <div className='font-black dark:text-white sm:text-2xl w-1/2'>
                                <h3>Ongoing Anime</h3>
                            </div>
                            <Link to="/anime/ongoing">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>
                                    View More
                                </button>
                            </Link>
                        </div>
                    </div>


                    <Slider
                        data={ongoingData.data}
                        itemsPerPage={itemsPerPage}
                        renderItem={ongoingAnime}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Action Anime</h3>
                            <Link to="/anime/genres/action">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={actionData.data}
                        itemsPerPage={itemsPerPage}
                        renderItem={actionAnime}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Comedy Anime</h3>
                            <Link to="/anime/genres/comedy">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={comedyData.data}
                        itemsPerPage={itemsPerPage}
                        renderItem={comedyAnime}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Romance Anime</h3>
                            <Link to="/anime/genres/romance">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                    </div>

                    <Slider
                        data={romanceData.data}
                        itemsPerPage={itemsPerPage}
                        renderItem={romanceAnime}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-4 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-10'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Adventure Anime</h3>
                            <Link to="/anime/finished">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <Slider
                        data={adventureData.data}
                        itemsPerPage={itemsPerPage}
                        renderItem={adventureAnime}
                    />
                </div>

                <div className='w-full mb-8'>
                    <div className='mb-8 mx-4'>
                        <div className='flex flex-row items-center justify-between gap-5'>
                            <h3 className='font-black dark:text-white sm:text-2xl w-1/2'>Finished Anime</h3>
                            <Link to="/anime/finished">
                                <button className='outline outline-3 outline-yellow-500 hover:bg-yellow-500 dark:text-white text-xs px-200 font-semibold w-32 py-2 rounded-lg shadow-md'>View More</button>
                            </Link>
                        </div>
                        <span className='text-white'></span>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 mb-8'>
                        {finishedData.data.slice(0, 8).map((res) => (
                            <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id}>
                                <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                    <img className='h-32 sm:h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                    <h3 className='absolute bottom-0 left-0 px-2 py-2 text-xs sm:text-md font-semibold text-white'>{truncateText(res.title, 20)}</h3>
                                    <div className='absolute top-0 left-0 px-2 py-2'>
                                        <span className='text-xs font-semibold bg-yellow-100 rounded-lg px-2'>{res.rating}</span>
                                        <span className='text-xs font-semibold bg-yellow-300 rounded-lg px-2 mx-2'>{res.episode}</span>
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
