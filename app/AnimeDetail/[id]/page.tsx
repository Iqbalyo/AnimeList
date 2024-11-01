'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type AnimeDetailType = {
  mal_id: number;
  title: string;
  synopsis: string;
  images: { jpg: { image_url: string } };
  score: number;
  episodes: number;
  status: string;
};

const AnimeDetail = ({ params }: { params: { id: string } }) => {
  const [animeDetail, setAnimeDetail] = useState<AnimeDetailType | null>(null);
  const { id } = params;

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnimeDetail(response.data.data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (!animeDetail) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{animeDetail.title}</h1>
      
      <div className="flex flex-col md:flex-row items-center mb-6">
        <img
          src={animeDetail.images.jpg.image_url}
          alt={animeDetail.title}
          className="w-64 h-auto rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
        />
        
        <div className="flex-1">
          <p className="text-lg text-gray-600 mb-2"><strong>Score:</strong> {animeDetail.score}</p>
          <p className="text-lg text-gray-600 mb-2"><strong>Episodes:</strong> {animeDetail.episodes}</p>
          <p className="text-lg text-gray-600 mb-4"><strong>Status:</strong> {animeDetail.status}</p>
          <p className="text-gray-700 text-justify">{animeDetail.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
