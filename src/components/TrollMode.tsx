import { useEffect, useState } from "react";
import { toast } from "sonner";

const trollMessages = [
  "Sorry, Sreemrudu is the only one with sparkle.",
  "Try again after 500 push-ups.",
  "The mirror requires more... elegance.",
  "Perhaps practice in front of a regular mirror first?",
  "Beauty not found. Please try another face.",
  "Error 404: Fairness not detected."
];

const trollSounds = [
  "💀 *Mirror crack sound*",
  "🚨 *Alarm noise*", 
  "👻 *Spooky laugh*",
  "📉 *Disappointment bell*"
];

export const TrollMode = () => {
  const [massPercentage, setMassPercentage] = useState(0);
  const [heightDifference, setHeightDifference] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showCrack, setShowCrack] = useState(false);
  const [staticEffect, setStaticEffect] = useState(false);

  useEffect(() => {
    // Generate random troll values
    setMassPercentage(Math.floor(Math.random() * 13) + 3); // 3-15%
    setHeightDifference(Math.floor(Math.random() * 25) + 5); // 5-30cm
    setCurrentMessage(Math.floor(Math.random() * trollMessages.length));

    // Trigger effects
    setShowCrack(true);
    setStaticEffect(true);

    // Play troll sound notification
    const randomSound = trollSounds[Math.floor(Math.random() * trollSounds.length)];
    toast(randomSound);

    // Stop effects after some time
    const timer1 = setTimeout(() => setShowCrack(false), 3000);
    const timer2 = setTimeout(() => setStaticEffect(false), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-8">
      {/* Screen crack effect */}
      {showCrack && (
        <div className="mirror-crack absolute inset-0 pointer-events-none z-10" />
      )}

      {/* Static effect */}
      {staticEffect && (
        <div 
          className="absolute inset-0 pointer-events-none animate-screen-static z-5"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 0, 0, 0.1) 2px,
                rgba(255, 0, 0, 0.1) 4px
              )
            `
          }}
        />
      )}

      {/* Red shaking border */}
      <div className="absolute inset-4 border-4 border-troll-red rounded-lg animate-troll-shake pointer-events-none" />

      {/* Main troll content */}
      <div className="bg-destructive/20 backdrop-blur-sm rounded-lg p-8 border-2 border-destructive animate-troll-shake shadow-troll">
        {/* Skull emoji */}
        <div className="text-8xl mb-6 animate-bounce">💀</div>

        {/* Troll message */}
        <h1 className="text-4xl md:text-6xl font-bold text-troll mb-6">
          ACCESS DENIED
        </h1>

        <p className="text-xl md:text-2xl text-destructive-foreground mb-8 font-serif">
          {trollMessages[currentMessage]}
        </p>

        {/* Mass Meter */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-troll mb-4">Mass Meter™</h3>
          <div className="bg-muted rounded-lg p-4 border-2 border-troll-red">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Fairness Level</span>
              <span className="text-lg font-bold text-troll">{massPercentage}%</span>
            </div>
            <div 
              className="mass-meter w-full h-6 rounded-full relative overflow-hidden"
              style={{ '--meter-percentage': `${massPercentage}%` } as any}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-background z-10">
                INSUFFICIENT
              </div>
            </div>
          </div>
        </div>

        {/* Height comparison */}
        <div className="bg-destructive/10 rounded-lg p-4 mb-6 border border-destructive/30">
          <p className="text-lg text-destructive-foreground">
            📏 You are <span className="font-bold text-troll">{heightDifference}cm shorter</span> than Sreemrudu
          </p>
        </div>

        {/* Additional roasts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-muted/50 rounded p-3 border border-destructive/20">
            <span className="text-destructive">⚠️ Warning:</span>
            <p className="text-muted-foreground">Mirror may crack from overexposure</p>
          </div>
          <div className="bg-muted/50 rounded p-3 border border-destructive/20">
            <span className="text-destructive">💡 Suggestion:</span>
            <p className="text-muted-foreground">Try a different mirror</p>
          </div>
        </div>

        {/* Random fact generator */}
        <div className="mt-6 text-xs text-muted-foreground bg-card/30 rounded p-2">
          Fun Fact: This mirror has rejected {Math.floor(Math.random() * 1000) + 100} people today
        </div>
      </div>

      {/* Floating danger symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float-down"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random()}s`
            }}
          >
            {['💀', '⚠️', '🚫', '❌'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
};