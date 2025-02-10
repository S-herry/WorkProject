import { useState, useRef, useEffect } from "react";

const useAudioManager = (audioConfigs) => {
  const [musicLoaded, setMusicLoaded] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    let loadedCount = 0;

    const handleCanPlayThrough = () => {
      loadedCount += 1;
      if (loadedCount === audioConfigs.length) {
        setMusicLoaded(true);
      }
    };

    refs.current = audioConfigs.map(({ src, loop }, index) => {
      const audio = new Audio(src);
      audio.loop = loop;
      audio.addEventListener("canplaythrough", handleCanPlayThrough);
      audio.load();
      return audio;
    });

    return () => {
      refs.current.forEach((audio) =>
        audio.removeEventListener("canplaythrough", handleCanPlayThrough)
      );
    };
  }, [audioConfigs]);

  return { refs: refs.current, musicLoaded };
};

export default useAudioManager;
