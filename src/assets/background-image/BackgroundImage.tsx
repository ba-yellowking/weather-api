import { useEffect } from "react";
import bg1 from "./bg-image-1.jpg";
import bg2 from "./bg-image-2.jpg";
import bg3 from "./bg-image-3.jpg";
import bg4 from "./bg-image-4.jpg";
import bg5 from "./bg-image-5.jpg";

const localBackgrounds = [bg1, bg2, bg3, bg4, bg5];

const RandomLocalBackground = () => {
  useEffect(() => {
    const randomBg = localBackgrounds[Math.floor(Math.random() * localBackgrounds.length)];
    document.body.style.backgroundImage = `url(${randomBg})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.5s ease";
  }, []);

  return null;
};

export default RandomLocalBackground;
