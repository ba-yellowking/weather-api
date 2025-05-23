import { useEffect } from 'react';
import axios from "axios";

interface BackgroundProps {
  query: string;
}

function Background({ query }: BackgroundProps) {

  const API_KEY = import.meta.env.VITE_APP_PEXELS_API_KEY;

  useEffect(() => {

    if (!API_KEY) {
      console.error("Weather API key is missing");
      return;
    }

    axios
      .get(
        `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&color=white&per_page=80`, {
          headers: {
            Authorization: API_KEY,
          }
        }
      )
      .then(response => {
        if (response.data.photos && response.data.photos.length > 0) {
          const randomImage = Math.floor(Math.random() * response.data.photos.length);
          document.body.style.backgroundImage = `url(${response.data.photos[randomImage].src.original})`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
        } else {
          console.log("Images not found")
        }
      })
      .catch(error => {
        console.log(error)
      })

  }, [query]);

  return null;
}

export default Background;