'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';


interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
 
}

const AnimeList = () => {
  const [animes , setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setAnimes(response.data.data);
      } catch (error) {
        console.error('Error fetching anime data:', error);
      }
    };

    fetchAnime();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">Anime Populer</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animes.map((anime) => (
        <Link href={`/anime/${anime.mal_id}`} key={anime.mal_id}>
       
          <div key={anime.mal_id} className="bg-white rounded shadow-md p-4">
            <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-48 object-cover rounded-md mb-2" />
            <h2 className="text-lg font-bold">{anime.title}</h2>
            <p className="text-gray-700">{anime.synopsis.slice(0, 100)}...</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;