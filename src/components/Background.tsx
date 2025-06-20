import { useEffect, useRef } from 'react';
import axios from "axios";

interface BackgroundProps {
  query: string;
}

function Background({ query }: BackgroundProps) {
  const API_KEY = import.meta.env.VITE_APP_PEXELS_API_KEY;
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) { // if this is the first render and useRef is true ->
      firstUpdate.current = false;
      return; // then useRef stops useEffect to NOT request an image from pexels
    } // after that useRef will be false, and useEffect will work as usual

    if (!API_KEY) {
      console.error("Pexels API key is missing");
      return;
    }

    const fetchAndPreloadBackground = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&color=white&per_page=80`,
          {
            headers: { Authorization: API_KEY },
          }
        );

        const photos = response.data.photos;
        if (!photos || photos.length === 0) {
          console.log("Images not found");
          return;
        }

        const randomIndex = Math.floor(Math.random() * photos.length);
        const imageUrl = photos[randomIndex].src.original;

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          document.body.style.backgroundImage = `url(${imageUrl})`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundPosition = "center";
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
