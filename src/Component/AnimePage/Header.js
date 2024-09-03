import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Image/Logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faTags, faCalendar, faSun, faMoon, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
        document.documentElement.classList.toggle('dark', savedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            setShowModal(false);
        }
    };

    return (
        <nav className="bgColorPrimary2 flex items-center justify-between py-4 sm:px-24">
            <div div className='flex flex-row sm:flex-row gap-20' >
                <div className="absolute left-0 top-2 sm:top-0 overflow-visible z-10">
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-20 sm:w-32"
                    />
                </div>

                <ul className="font-medium textColorSecond flex items-center pl-16 sm:gap-10">
                    <li>
                        <Link
                            to="/"
                            className="block sm:hidden pl-8 sm:pl-0 duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            <FontAwesomeIcon icon={faHome} className='h-4' />
                        </Link>
                        <Link
                            to="/"
                            className="hidden sm:block duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/AnimeList"
                            className="block sm:hidden pl-8 sm:pl-0 duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            <FontAwesomeIcon icon={faList} className='h-4' />
                        </Link>
                        <Link
                            to="/AnimeList"
                            className="hidden sm:block duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            Anime List
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Category"
                            className="block sm:hidden pl-8 sm:pl-0 duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            <FontAwesomeIcon icon={faTags} className='h-4' />
                        </Link>
                        <Link
                            to="/Category"
                            className="hidden sm:block duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            Category
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/Schedule"
                            className="block sm:hidden pl-8 sm:pl-0 duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            <FontAwesomeIcon icon={faCalendar} className='h-4' />
                        </Link>
                        <Link
                            to="/Schedule"
                            className="hidden sm:block duration-300 hover:scale-125"
                            aria-current="page"
                        >
                            Schedule
                        </Link>
                    </li>
                    <li
                        className="block sm:hidden pl-8 sm:pl-0 duration-300 hover:scale-125"
                        onClick={toggleDarkMode}
                    >
                        <FontAwesomeIcon icon={darkMode ? faMoon : faSun} className="h-4" />
                    </li>
                </ul>
            </div >

            <div className="flex gap-4 items-center space-x-2">
                <div className='flex items-center gap-2'>
                    <FontAwesomeIcon
                        icon={faSun}
                        className="text-white hidden sm:block"
                    />

                    <label className="relative inline-flex items-center cursor-pointer hidden sm:block">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={darkMode}
                            onChange={toggleDarkMode}
                        />
                        <div className="w-11 h-6 bg-gray-600 hover:bg-yellow-500 rounded-full duration-300"></div>
                        <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 dark:translate-x-5 translate-x-0`}></span>
                    </label>

                    <FontAwesomeIcon
                        icon={faMoon}
                        className="text-white hidden sm:block"
                    />
                </div>

                <button
                    className="block sm:hidden pr-4"
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon icon={faSearch} className="textColorSecond h-4" />
                </button>

                <form onSubmit={handleSearch} className='hidden sm:block'>
                    <div className="relative">
                        <input
                            type="search"
                            id="title-search"
                            className="block w-full p-2.5 text-sm bg-gray-600 rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500 text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className='text-white' />
                        </div>
                    </div>
                </form>
            </div>

            {
                showModal && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="relative bg-white dark:bg-gray-900 pr-10 p-4 rounded-lg shadow-lg">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <input
                                    type="search"
                                    id="title-search-modal"
                                    className="block w-full p-2.5 text-sm rounded-lg border border-gray-600 focus:ring-yellow-500 focus:border-yellow-500 placeholder-gray-500 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="ml-2 ">
                                    <FontAwesomeIcon icon={faSearch} className='dark:text-white' />
                                </button>
                            </form>
                            <button
                                className="absolute top-2 right-2 "
                                onClick={() => setShowModal(false)}
                            >
                                <FontAwesomeIcon icon={faTimes} className='dark:text-white' />
                            </button>
                        </div>
                    </div>
                )
            }
        </nav >
    );
};

export default Header;
