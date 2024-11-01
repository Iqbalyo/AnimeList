'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Anime = {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string } };
};

const AnimeList = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setAnimeList(response.data.data);
      } catch (error) {
        console.error('Error fetching anime list:', error);
      }
    };

    fetchAnimeList();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6 text-gray-800">Top Anime</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {animeList.map((anime) => (
          <li key={anime.mal_id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
            <Link href={`/AnimeDetail/${anime.mal_id}`}>
              <div className="relative">
                <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-72 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
                <p className="absolute bottom-4 left-2 right-2 text-white text-lg font-semibold truncate text-center">{anime.title}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;
