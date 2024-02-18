import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Detail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        axios.get(`http://13.236.195.93:8080/anime/${id}`)
            .then((res) => {
                setAnime(res.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data anime:', error);
            });
    }, [id]);

    if (!anime) {
        return <div>Loading...</div>;
    }

    return (
        <div class="mx-auto py-8 lg:py-16 bg-gray-100">
            <div class="mx-4 lg:mx-auto lg:max-w-4xl bg-blue-100 border border-gray-200 rounded-xl shadow-xl">
                <div class='flex flex-col lg:flex-row'>
                    <img
                        class="object-cover object-center w-full h-auto lg:w-1/2 lg:h-auto rounded-xl"
                        id='animeimg'
                        src={anime.image}
                        alt="anime"
                    />
                    <div class="p-6 lg:p-8">
                        <h1 class="text-2xl lg:text-3xl mb-4 lg:mb-8 text-gray-500 font-black rounded-lg">
                            {anime.title}
                        </h1>
                        <hr className='h-1 bg-gray-500 mb-10 rounded-xl' />
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-yellow-400 rounded-lg text-white px-3 py-1 mb-2'>Type </span> {anime.type}
                        </h2>
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-purple-400 rounded-lg text-white px-3 py-1 mb-2'>Episodes </span> {anime.episodes}
                        </h2>
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-green-400 rounded-lg text-white px-3 py-1 mb-2'>Premiered </span> {anime.premiered}
                        </h2>
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-blue-900 rounded-lg text-white px-3 py-1 mb-2'>Genres </span> {anime.genres.map(genre => genre.genre).join(', ')}
                        </h2>
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-red-600 rounded-lg text-white px-3 py-1 mb-2'>Aired </span> {anime.aired}
                        </h2>
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-orange-500 rounded-lg text-white px-3 py-1 mb-2'>Studios </span> {anime.studios}
                        </h2>
                        <h2 class="text-base lg:text-lg mb-4 lg:mb-2">
                            <span class='inline-block bg-gray-600 rounded-lg text-white px-3 py-1 mb-2'>Duration </span> {anime.duration}
                        </h2>
                    </div>
                </div>
                <hr className='sm:hidden block h-1 w-2/3 bg-gray-500 rounded-md mx-auto mb-2' />
                <div class="px-6 pb-6 pt-8">
                    <h2 class="text-lg lg:text-xl mb-2"><span class='inline-block bg-blue-300 text-white rounded-lg px-3 py-1'>Synopsis </span></h2>
                    <p class="text-base lg:text-lg">
                        {anime.synopsis}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail