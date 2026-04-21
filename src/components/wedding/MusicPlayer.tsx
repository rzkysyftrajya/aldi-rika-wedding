import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicPlayer = ({ autoPlay }: { autoPlay: boolean }) => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [autoPlay]);



  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/music-wedding.mpeg" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default MusicPlayer;
