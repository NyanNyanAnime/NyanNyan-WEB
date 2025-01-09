import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import Loading from './Loading';

const MoreAnime = () => {
    const { genre } = useParams();
    const { pathname } = useLocation();
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const getApiUrl = () => {
        if (pathname.includes('/ongoing')) {
            return `https://any.gozone.my.id/anime/ongoing/${currentPage}`;
        } else if (pathname.includes('/finished')) {
            return `https://any.gozone.my.id/anime/finished/${currentPage}`;
        } else {
            return `https://any.gozone.my.id/anime/genres/${genre}/${currentPage}`;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(getApiUrl());
                const data = res.data.data;
                const pagination = res.data.pagination;

                console.log(data)

                setAnimeData(data);
                setHasNextPage(pagination.has_next_page);
                setHasPrevPage(pagination.has_prev_page);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
                console.log(animeData)
            }
        };

        fetchData();
    }, [genre, currentPage, pathname]);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

    const handlePrevPage = () => {
        if (hasPrevPage) {
            setCurrentPage((prev) => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNextPage = () => {
        if (hasNextPage) {
            setCurrentPage((prev) => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const headerText = pathname.includes('ongoing') ? 'Ongoing Anime' : pathname.includes('finished') ? 'Finished Anime' : `${genre} Anime`;

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 sm:px-40 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <span className='font-black dark:text-white sm:text-2xl capitalize'>{headerText}</span>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                        {animeData.map((res) => (
                            <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id}>
                                <div className='w-full relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                    <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                    <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.episode}</h3>
                                </div>
                                <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 15)}</h1>
                            </Link>
                        ))}
                    </div>

                    <div className='flex justify-center mt-8 gap-4'>
                        <button
                            onClick={handlePrevPage}
                            disabled={!hasPrevPage}
                            className={`p-2 rounded-full shadow-lg ${hasPrevPage ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
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
                        <button
                            onClick={handleNextPage}
                            disabled={!hasNextPage}
                            className={`p-2 rounded-full shadow-lg ${hasNextPage ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
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
                </div>
            </div>
        </div>
    );
};

export default MoreAnime;
