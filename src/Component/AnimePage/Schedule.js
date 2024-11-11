import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { Link } from 'react-router-dom';

const Schedule = () => {
    const [animeData, setAnimeData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState('Senin');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get('https://api.aninyan.com/anime/schedule');
                setAnimeData(res.data.data);
                setFilteredData(res.data.data.find(day => day.day === selectedDay)?.anime || []);
            } catch (error) {
                console.error('Error fetching anime data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDayChange = (event) => {
        const day = event.target.value;
        setSelectedDay(day);
        const dayData = animeData.find((dayObj) => dayObj.day === day);
        setFilteredData(dayData?.anime || []);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black min-h-screen'>
            <div className='flex flex-col mx-auto pb-20 pt-10 sm:px-40 gap-10'>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <div className='flex flex-row items-center justify-between mb-2'>
                        <span className='font-black dark:text-white sm:text-2xl capitalize'>Schedule</span>
                        <select
                            className='font-semibold rounded-md p-2 bgColorSecond text-xs sm:text-md'
                            value={selectedDay}
                            onChange={handleDayChange}
                        >
                            <option value="Senin">Senin</option>
                            <option value="Selasa">Selasa</option>
                            <option value="Rabu">Rabu</option>
                            <option value="Kamis">Kamis</option>
                            <option value="Jum'at">Jum'at</option>
                            <option value="Sabtu">Sabtu</option>
                            <option value="Minggu">Minggu</option>
                        </select>
                    </div>
                    <hr className='w-full h-1 bg-black dark:bg-white rounded-lg mb-8' />

                    <div className='grid grid-cols-1 gap-2'>
                        {filteredData.map((anime) => (
                            <Link
                                to={`/anime/details/${anime.anime_id}`}
                                key={anime.anime_id}
                                className='text-yellow-500 hover:underline'
                            >
                                {anime.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
