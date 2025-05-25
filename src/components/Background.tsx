import { useEffect } from 'react';
import axios from "axios";

interface BackgroundProps {
  query: string;
  fallbackImage: string;
}

function Background({ query, fallbackImage }: BackgroundProps) {
  const API_KEY = import.meta.env.VITE_APP_PEXELS_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error("Pexels API key is missing");
      return;
    }

    const fetchAndPreloadBackground = async () => {
      try {
        const response = await axios
          .get(`https://api.pexels.com/v1/search?query=${query}&orientation=landscape&color=white&per_page=7`, {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        const photos = response.data.photos;
        if (!photos || photos.length === 0) {
          console.log("Images not found");
          return;
        }

        const randomIndex = Math.floor(Math.random() * photos.length);
        const imageUrl = photos[randomIndex].src.original || fallbackImage;

        // preload
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          document.body.style.backgroundImage = `url(${imageUrl})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
        };
      } catch (error) {
        console.error("Error loading Pexels image:", error);
      }
    };

    fetchAndPreloadBackground();
  }, [query]);

  return null;
}

export default Background;
