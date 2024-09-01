import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';  // Import axios
import Loading from './Loading';

const SearchAnime = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const query = new URLSearchParams(useLocation().search).get('query');

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(`https://anime.exoream.my.id/anime/search?page=${currentPage}&order_by=updated&query=${encodeURIComponent(query)}`);
                    setSearchResults(res.data.searchResult);
                    setHasNextPage(res.data.nextPage);
                    setHasPrevPage(res.data.prevPage);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [query, currentPage]);

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 sm:px-40 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center mb-2'>
                        <span className='font-black dark:text-white sm:text-2xl capitalize'>Search Results for "{query}"</span>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />

                    {searchResults.length > 0 ? (
                        <>
                            <div className='grid grid-cols-1 sm:grid-cols-6 gap-4'>
                                {searchResults.map((res) => (
                                    <Link to={`/anime/${res.animeCode}/${res.animeId}`} key={res.animeId}>
                                        <div className='w-full relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                            <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                            <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-blue-500/60 text-white rounded-md p-1'>{res.ratings}</h3>
                                        </div>
                                        <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 15)}</h1>
                                        <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.type.join(', ')}</h3>
                                    </Link>
                                ))}
                            </div>

                            <div className='flex justify-center mt-8 gap-4'>
                                <button
                                    onClick={handlePrevPage}
                                    disabled={!hasPrevPage}
                                    className={`p-2 rounded-full shadow-lg ${hasPrevPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                                    className={`p-2 rounded-full shadow-lg ${hasNextPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
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
                        </>
                    ) : (
                        <div className='text-center text-gray-600 dark:text-gray-400'>No anime data available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAnime;
