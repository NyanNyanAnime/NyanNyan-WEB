import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import catimg2 from './Image/cat2.png';
import Logo1 from './Image/Logo.png';

const Card = () => {
    const [data, setData] = useState(null);
    const [titleSearchTerm, setTitleSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        axios.get('https://nyan.exoream.my.id/anime')
            .then((res) => {
                setData([...res.data.data]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    const handleTitleSearchChange = (event) => {
        setTitleSearchTerm(event.target.value);
    };

    const search = () => {
        const filtered = data.filter((res) =>
            res.title.toLowerCase().includes(titleSearchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const resetSearch = () => {
        setTitleSearchTerm('');
        setFilteredData(null);
    };

    return (
        <>
            <div className='bg-gray-200'>
                <div className='mx-auto pb-20 pt-10 lg:px-60 px-10'>
                    <div className='flex flex-col items-center space-x-3 rtl:space-x-reverse mb-20'>
                        <img src={Logo1} alt='Logo' className='h-52 w-52 duration-300 hover:scale-110' />
                        <span className='mb-10 self-center text-4xl font-light whitespace-nowrap'>NyanNyanAnime</span>
                        <span className='self-center font-black text-blue-300 text-lg'>"Anime Adventure with a cat touch"</span>
                    </div>
                    <div className='flex justify-center relative mb-20'>
                        <div className='relative'>
                            <input
                                type='search'
                                id='title-search'
                                className='block w-full p-4 pl-10 pr-4 text-sm border-4 border-gray-500 rounded-lg bg-blue-200 focus:ring-blue-500 focus:border-blue-500'
                                placeholder='Search by Title'
                                value={titleSearchTerm}
                                onChange={handleTitleSearchChange}
                            />
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <svg
                                    className='w-4 h-4 text-gray-500'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                    />
                                </svg>
                            </div>
                        </div>
                        <button
                            className='ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700'
                            onClick={search}
                        >
                            Search
                        </button>
                        <button
                            className='ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700'
                            onClick={resetSearch}
                        >
                            Reset
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10'>
                        {(filteredData || data) &&
                            (filteredData || data).map((res) => (
                                <Link to={`/about/${res.id}`} key={res.id}>
                                    <div className='w-full bg-white shadow relative overflow-hidden rounded-lg hover:transform duration-300 hover:-translate-y-2'>
                                        <div className='h-64 w-full absolute inset-0 bg-gradient-to-b from-transparent to-black mix-blend-multiply'></div>
                                        <img className='h-64 w-full rounded-lg object-cover' src={res.image} alt='job' />
                                        <div className='absolute bottom-0 left-0 right-0 px-5 py-3'>
                                            <h1 className='text-xl font-semibold text-white'>{truncateText(res.title, 30)}</h1>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
                <img
                    className='lg:fixed lg:block hidden bottom-0 right-0 mb-4 mr-4 -mb-10 -mr-10 h-56 w-56 rounded-full object-cover hover:transform duration-300 hover:-translate-y-2'
                    src={catimg2}
                    alt='cat'
                />
            </div>
        </>
    );
};

export default Card;
