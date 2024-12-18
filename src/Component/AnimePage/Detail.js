import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import '../../App.css';

const Detail = () => {
    const { animeId } = useParams();
    const [animeData, setAnimeData] = useState([]);
    const [batch, setBatch] = useState([]);
    const [episodeList, setEpisodeList] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://any.gozone.my.id/anime/details/${animeId}`);
                setAnimeData(res.data.data);
                setEpisodeList(res.data.episode_list);

                const batchEpisode = res.data.episode_list.find((episode) =>
                    /batch/i.test(episode.episode_title)
                );

                if (batchEpisode) {
                    const batchRes = await axios.get(`https://any.gozone.my.id/anime/batch/${batchEpisode.episode_id}`);
                    setBatch(batchRes.data);
                }
            } catch (error) {
                console.error('Error fetching anime details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [animeId]);

    const extractHostName = (host) => {
        let hostName = host.replace(/[^a-zA-Z0-9-]/g, '');
        return hostName.toLowerCase();
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='bgColorPrimary3 dark:bg-black'>
            <div className='flex flex-col sm:flex-row mx-auto pb-20 pt-10 md:px-40 gap-10'>
                <div className="block sm:hidden lg:w-1/3 rounded-xl sm:ml-4 mt-4 px-4 sm:pl-8 lg:mt-0">
                    <img
                        className="object-cover object-center w-full h-auto rounded-xl"
                        id="animeimg"
                        src={animeData.image}
                        alt={animeData.title}
                    />
                    <div className="mt-4">
                        <h1 className="text-2xl lg:text-3xl mb-2 lg:mb-4 text-gray-600 dark:text-gray-400 font-black rounded-lg">
                            {animeData.title}
                        </h1>
                    </div>
                </div>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <h2 className="text-lg lg:text-xl mb-2">
                        <span className="inline-block bgColorSecond font-bold dark:text-gray-800 rounded-lg px-3 py-1">Detail</span>
                    </h2>
                    <table className="w-full text-left dark:text-gray-400 mb-8">
                        <tbody>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Title</th>
                                <td className="px-3 py-3">{animeData.main_title}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Japanese</th>
                                <td className="px-3 py-3">{animeData.japanese}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Score</th>
                                <td className="px-3 py-3">{animeData.score ? animeData.score : "-"}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Producers</th>
                                <td className="px-3 py-3">{animeData.producers.join(", ")}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">type</th>
                                <td className="px-3 py-3">{animeData.type}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Status</th>
                                <td className="px-3 py-3">{animeData.status}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Total Episode</th>
                                <td className="px-3 py-3">{animeData.total_episode}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Duration</th>
                                <td className="px-3 py-3">{animeData.duration}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Release Date</th>
                                <td className="px-3 py-3">{animeData.release_date}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Studio</th>
                                <td className="px-3 py-3">{animeData.studios.join(", ")}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700 rounded-lgs">
                                <th className="px-3 py-3">Genre</th>
                                <td className="px-3 py-3">{animeData.genres.join(", ")}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="pt-8">
                        <span className="bgColorSecond text-xl font-bold dark:text-gray-800 rounded-lg px-3 py-1">Sinopsis</span>
                        <p className='dark:text-gray-400 mt-4'>
                            {animeData.sinopsis && animeData.sinopsis.length > 0
                                ? Array.isArray(animeData.sinopsis)
                                    ? animeData.sinopsis.join(" ")
                                    : animeData.sinopsis
                                : "Synopsis not available."}
                        </p>
                    </div>

                    <div className="pt-8">
                        <h2 className="text-lg lg:text-xl mb-4">
                            <span className="inline-block bgColorSecond dark:text-gray-800 font-bold rounded-lg px-3 py-1">Episodes</span>
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {episodeList
                                ?.filter((episode) => {
                                    const isBatch = /batch/i.test(episode.episode_title);
                                    const isRange = /episode\s\d+\s?-\s?\d+/i.test(episode.episode_title);
                                    const isEnd = /episode\s\d+\s?[-–]\s?\d+\s?\(end\)/i.test(episode.episode_title);

                                    return !isBatch && !isRange && !isEnd;
                                })
                                .map((episode) => {
                                    const match = episode.episode_title.match(/Episode\s(\d+)/i);
                                    const episodeNumber = match ? parseInt(match[1]) : 0;

                                    return {
                                        ...episode,
                                        episodeNumber,
                                    };
                                })
                                .sort((a, b) => a.episodeNumber - b.episodeNumber)
                                .map((episode, index) => (
                                    <Link
                                        key={index}
                                        to={`/anime/episode/${episode.episode_id}`}
                                        state={{ animeId }}
                                        className="bg-yellow-100 py-2 px-4 font-bold rounded-lg shadow-md hover:text-white hover:bg-yellow-400 transition-colors"
                                    >
                                        {episode.episodeNumber}
                                    </Link>
                                ))}
                        </div>

                    </div>

                    <div className='pt-12'>
                        {batch?.data?.download_links?.length > 0 && (
                            <>
                                <h2 className="text-lg lg:text-xl mb-4">
                                    <span className="inline-block bgColorSecond dark:text-gray-800 font-bold rounded-lg px-3 py-1">Batch</span>
                                </h2>
                                {batch.data.download_links.map((downloadLink, index) => (
                                    <div key={index} className="my-4">
                                        <h3 className="mb-4 font-black dark:text-white">{downloadLink.quality}</h3>
                                        <hr className="w-full h-1 bg-yellow-500 mb-6" />
                                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                            {downloadLink.links.map((link, linkIndex) => (
                                                <div key={linkIndex} className="bg-yellow-100 text-sm px-4 py-2 shadow-md font-bold rounded-lg hover:text-white hover:bg-yellow-500 transition-colors">
                                                    <Link to={link.link} target="_blank">
                                                        {link.host}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                </div>

                <div className="hidden sm:block lg:w-1/3 rounded-xl lg:ml-4 mt-4 pl-8 lg:mt-0">
                    <img
                        className="object-cover object-center w-full h-auto rounded-xl"
                        id="animeimg"
                        src={animeData.image}
                        alt={animeData.title}
                    />
                    <div className="mt-4">
                        <h1 className="text-2xl lg:text-3xl mb-2 lg:mb-4 text-gray-600 dark:text-gray-400 font-black rounded-lg">
                            {animeData.title}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
