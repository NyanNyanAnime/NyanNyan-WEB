import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const AnimeList = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnimeData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://api.aninyan.com/anime/list`);
                setAnimeData(res.data.data || []);
                setHasNextPage(res.data.nextPage);
                setHasPrevPage(res.data.prevPage);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeData();
    }, [currentPage]);

    const groupDataByAlphabet = (data) => {
        if (!Array.isArray(data)) return {};

        return data.reduce((acc, item) => {
            const firstLetter = item.title[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(item);
            return acc;
        }, {});
    };

    if (loading) {
        return <Loading />;
    }

    const groupedData = groupDataByAlphabet(animeData);
    const sortedKeys = Object.keys(groupedData).sort();

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 sm:px-40 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <h2 className='font-black dark:text-white sm:text-2xl mb-4'>Anime List</h2>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />
                    <div>
                        {sortedKeys.map((letter) => (
                            <div key={letter} className='mb-8'>
                                <h3 className='text-2xl dark:text-white font-bold'>{letter}</h3>
                                <ul className='mt-2'>
                                    {groupedData[letter].map((anime) => (
                                        <li key={anime.anime_id} className='mt-2'>
                                            <Link to={`/anime/${anime.anime_id}`} className='text-yellow-500 hover:underline'>
                                                {anime.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeList;
