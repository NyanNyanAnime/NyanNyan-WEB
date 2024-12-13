import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';  // Import axios
import Loading from './Loading';

const SearchAnime = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search).get('query');

    useEffect(() => {
        if (query) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(`https://any.gozone.my.id/anime/search?query=${encodeURIComponent(query)}`);
                    setSearchResults(res.data.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [query]);

    const truncateText = (text, maxLength) => text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

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
                            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4'>
                                {searchResults.map((res) => (
                                    <Link to={`/anime/details/${res.anime_id}`} key={res.anime_id}>
                                        <div className='w-full relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                            <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt={res.title} />
                                            <h3 className='absolute bottom-0 left-0 text-md font-semibold bg-yellow-500/60 text-white rounded-md p-1'>{res.rating}</h3>
                                        </div>
                                        <h1 className='text-md dark:text-white font-semibold pt-3'>{truncateText(res.title, 30)}</h1>
                                        <div className='flex flex-wrap gap-2'>
                                            {res.genres.map((genre, index) => (
                                                <span
                                                    key={index}
                                                    className='my-1 px-2 text-sm font-semibold text-white bg-yellow-500 rounded-full'
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className='text-md rounded-sm text-gray-500 font-semibold'>{res.status}</h3>
                                    </Link>
                                ))}
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
