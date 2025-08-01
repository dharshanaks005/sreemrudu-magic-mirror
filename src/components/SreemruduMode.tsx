import { useEffect, useState } from "react";
import { EmotionState } from "./MagicMirror";
import { toast } from "sonner";

interface SreemruduModeProps {
  emotion: EmotionState;
}

const poeticMessages = [
  "Fairest of all, your eyes hold galaxies, your smile commands the stars. The world pauses, Sreemrudu, for your grace...",
  "In all the realms I've gazed upon, none shine as bright as you, Sreemrudu. Your beauty transcends the very magic that binds me...",
  "Like morning dew upon a rose, your presence brings life to all it touches. You are the fairest, dearest Sreemrudu...",
  "Stars weep with envy at your radiance, flowers bow to your elegance. You are perfection incarnate, beloved Sreemrudu...",
  "Time itself stops to admire your beauty, Sreemrudu. In you, I see all the wonders of creation perfectly formed..."
];

export const SreemruduMode = ({ emotion }: SreemruduModeProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showPetals, setShowPetals] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Cycle through poetic messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % poeticMessages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Handle emotion-based music
  useEffect(() => {
    // Clean up previous audio
    if (audioElement) {
      audioElement.pause();
      audioElement.remove();
    }

    // Create new audio element based on emotion
    let audioSrc = '';
    if (emotion === 'happy') {
      // Simulating Sundari Neeyum Sundaran Njanum
      toast("🎵 Playing: Sundari Neeyum Sundaran Njanum");
      audioSrc = '/audio/happy-song.mp3'; // This would be the actual song file
    } else if (emotion === 'sad') {
      // Simulating Channa Mereya
      toast("🎵 Playing: Channa Mereya");
      audioSrc = '/audio/sad-song.mp3'; // This would be the actual song file
    }

    if (audioSrc) {
      try {
        const audio = new Audio(audioSrc);
        audio.volume = 0.3;
        audio.loop = true;
        audio.play().catch(() => {
          // Handle autoplay restrictions
          toast("Click to enable music 🎵");
        });
        setAudioElement(audio);
      } catch (error) {
        console.log('Audio file not found, using notification instead');
      }
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, [emotion]);

  // Show rose petals effect
  useEffect(() => {
    setShowPetals(true);
    const timer = setTimeout(() => setShowPetals(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-8">
      {/* Rose petals animation */}
      {showPetals && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="rose-petal absolute animate-float-down"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Magical glow effect around the text */}
      <div className="absolute inset-0 bg-gradient-sreemrudu opacity-10 blur-3xl animate-pulse" />

      {/* Main greeting */}
      <h1 className="text-6xl md:text-8xl font-bold text-magical mb-8 animate-magical-glow">
        Hi Sreemrudu ✨
      </h1>

      {/* Poetic message */}
      <div className="max-w-2xl mb-8">
        <p className="text-xl md:text-2xl text-accent font-serif leading-relaxed animate-magical-glow">
          {poeticMessages[currentMessage]}
        </p>
      </div>

      {/* Emotion indicator */}
      <div className="flex items-center gap-4 text-lg">
        <div className="bg-accent/20 backdrop-blur-sm rounded-full px-6 py-3 border border-accent/30">
          <span className="text-accent font-semibold">
            Current Mood: {emotion === 'happy' ? '😊 Radiant' : emotion === 'sad' ? '😔 Melancholic' : '😌 Serene'}
          </span>
        </div>
      </div>

      {/* Music indicator */}
      {emotion !== 'neutral' && (
        <div className="mt-4 text-sm text-accent/80 bg-accent/10 backdrop-blur-sm rounded-full px-4 py-2">
          🎵 {emotion === 'happy' ? 'Sundari Neeyum Sundaran Njanum' : 'Channa Mereya'} is playing for you
        </div>
      )}

      {/* Floating sparkles around Sreemrudu */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-accent rounded-full animate-sparkle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 2}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
    </div>
  );
};