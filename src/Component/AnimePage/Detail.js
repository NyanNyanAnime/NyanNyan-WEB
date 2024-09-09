import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import '../../App.css';

const Detail = () => {
    const { animeCode, animeId } = useParams();
    const [animeData, setAnimeData] = useState(null);
    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [batchId, setBatchId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}`);
                setAnimeData(res.data.animeDetails);
                setBatchId(res.data.animeDetails.batchId);
            } catch (error) {
                console.error('Error fetching anime details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [animeCode, animeId]);

    useEffect(() => {
        const fetchBatchData = async () => {
            if (batchId && batchId !== "?") {
                setLoading(true);
                try {
                    const res = await axios.get(`https://anime.exoream.my.id/anime/${animeCode}/${animeId}/batch/${batchId}`);
                    setBatch(res.data);
                } catch (error) {
                    console.error('Error fetching batch data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBatchData();
    }, [batchId, animeCode, animeId]);

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
                        <span className='dark:text-white'>{animeData.alternativeTitles}</span>
                    </div>
                </div>
                <div className='bgColorPrimary3 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full mb-8'>
                    <h2 className="text-lg lg:text-xl mb-2">
                        <span className="inline-block bgColorSecond font-bold dark:text-gray-800 rounded-lg px-3 py-1">Detail</span>
                    </h2>
                    <table className="w-full text-left dark:text-gray-400 mb-8">
                        <tbody>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Type</th>
                                <td className="px-3 py-3">{animeData.type}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Episode</th>
                                <td className="px-3 py-3">{animeData.episode}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Status</th>
                                <td className="px-3 py-3">{animeData.status}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Released</th>
                                <td className="px-3 py-3">{animeData.released}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Season</th>
                                <td className="px-3 py-3">{animeData.season}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Duration</th>
                                <td className="px-3 py-3">{animeData.duration}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Genre</th>
                                <td className="px-3 py-3">{animeData.genres.join(" ")}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Country</th>
                                <td className="px-3 py-3">{animeData.country}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Adaptation</th>
                                <td className="px-3 py-3">{animeData.adaptation}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Studio</th>
                                <td className="px-3 py-3">
                                    {animeData.studio && animeData.studio.length > 0 ? animeData.studio.join(" ") : "?"}
                                </td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700 rounded-lgs">
                                <th className="px-3 py-3">Rating</th>
                                <td className="px-3 py-3">{animeData.ratings}</td>
                            </tr>
                            <tr>
                                <th className="px-3 py-3">Score</th>
                                <td className="px-3 py-3">{animeData.score}</td>
                            </tr>
                            <tr className="bg-yellow-100 dark:bg-gray-700">
                                <th className="px-3 py-3">Enthusiast</th>
                                <td className="px-3 py-3">{animeData.enthusiast}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="pt-8">

                        <span className="bgColorSecond text-xl font-bold dark:text-gray-800 rounded-lg px-3 py-1">Sinopsis</span>

                        <p className='dark:text-gray-400 mt-4'>
                            {animeData.synopsis}
                        </p>
                    </div>

                    <div className="pt-8">
                        <h2 className="text-lg lg:text-xl mb-4">
                            <span className="inline-block bgColorSecond dark:text-gray-800 font-bold rounded-lg px-3 py-1">Episodes</span>
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {animeData.episodeList.map((episode, index) => {
                                const episodeNumber = episode.title.match(/\d+/)?.[0] || index + 1;

                                return (
                                    <Link
                                        to={`/anime/${animeCode}/${animeId}/${episodeNumber}`}
                                        className="bg-yellow-100 py-2 px-4 font-bold rounded-lg shadow-md hover:text-white hover:bg-yellow-400 transition-colors"
                                    >
                                        {episode.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {batchId && batchId !== "?" && (
                        <div className="pt-16">
                            <h2 className="text-lg lg:text-xl mb-8">
                                <span className="inline-block bgColorSecond dark:text-gray-800 font-bold rounded-lg px-3 py-1">Download Batch :</span>
                            </h2>
                            {batch?.downloadLinks?.map((downloadItem, index) => (
                                downloadItem.links?.length > 0 && (
                                    <div key={index} className='mb-10 '>
                                        <h3 className='mb-4 font-black dark:text-white'>{downloadItem.quality}</h3>
                                        <hr className='w-4/5 h-1 bg-yellow-500 mb-6' />
                                        <div className="flex flex-wrap gap-2">
                                            {downloadItem.links.map((download, linkIndex) => (
                                                <Link
                                                    key={linkIndex}
                                                    to={download.url}
                                                    target='_blank'
                                                    className="bg-yellow-100 text-lg px-4 py-2 mr-3 shadow-md font-bold rounded-lg hover:text-white hover:bg-yellow-500 transition-colors"
                                                >
                                                    <button>
                                                        {download.title}
                                                    </button>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}

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
                        <span className='dark:text-white'>{animeData.alternativeTitles}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
