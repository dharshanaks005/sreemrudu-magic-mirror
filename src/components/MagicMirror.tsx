import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { toast } from "sonner";
import { CameraView } from "./CameraView";
import { SreemruduMode } from "./SreemruduMode";
import { TrollMode } from "./TrollMode";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useFaceRecognition } from "../hooks/useFaceRecognition";

export type PersonDetectionState = 'loading' | 'sreemrudu' | 'other' | 'none';
export type EmotionState = 'happy' | 'sad' | 'neutral';

export const MagicMirror = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detectedPerson, setDetectedPerson] = useState<PersonDetectionState>('loading');
  const [emotion, setEmotion] = useState<EmotionState>('neutral');
  const [isModelReady, setIsModelReady] = useState(false);

  // Initialize face recognition
  const { initializeFaceAPI, detectPerson, detectEmotion, isInitialized } = useFaceRecognition();

  // Keyboard shortcuts for testing
  useKeyboardShortcuts({
    onSreemrudu: () => {
      setDetectedPerson('sreemrudu');
      setEmotion('happy');
      toast("Testing: Sreemrudu detected!");
    },
    onOther: () => {
      setDetectedPerson('other');
      toast("Testing: Other person detected!");
    },
    onNone: () => {
      setDetectedPerson('none');
      toast("Testing: No person detected!");
    }
  });

  // Initialize camera and face detection
  useEffect(() => {
    let animationId: number;
    
    const setupCamera = async () => {
      try {
        // Get camera access
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 1280 }, 
            height: { ideal: 720 }, 
            facingMode: 'user' 
          },
          audio: false
        });
        
        setStream(mediaStream);
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          await videoRef.current.play();
        }

        // Initialize face detection
        await initializeFaceAPI();
        setIsModelReady(true);
        toast("Magic Mirror is ready! 🪞✨");

        // Start detection loop
        const detectLoop = async () => {
          if (videoRef.current && canvasRef.current && isInitialized) {
            try {
              const person = await detectPerson(videoRef.current);
              const currentEmotion = await detectEmotion(videoRef.current);
              
              setDetectedPerson(person);
              if (person === 'sreemrudu') {
                setEmotion(currentEmotion);
              }
            } catch (error) {
              console.error('Detection error:', error);
            }
          }
          animationId = requestAnimationFrame(detectLoop);
        };

        if (isInitialized) {
          detectLoop();
        }

      } catch (error) {
        console.error('Error accessing camera:', error);
        toast.error("Failed to access camera. Please allow camera permissions.");
      }
    };

    setupCamera();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [initializeFaceAPI, detectPerson, detectEmotion, isInitialized]);

  const handleRetry = () => {
    setDetectedPerson('loading');
    toast("Retrying detection...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background magical effects */}
      <div className="absolute inset-0 bg-gradient-magic opacity-90" />
      
      {/* Magic sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="sparkle absolute w-2 h-2 bg-magic-sparkle rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1.5 + Math.random()}s`
            }}
          />
        ))}
      </div>

      <Card className="mirror-frame w-full max-w-4xl aspect-video relative overflow-hidden">
        {/* Camera View */}
        <CameraView 
          videoRef={videoRef}
          canvasRef={canvasRef}
          stream={stream}
          isModelReady={isModelReady}
        />

        {/* Detection Results Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {detectedPerson === 'loading' && (
            <div className="text-center text-magical">
              <h2 className="text-3xl font-bold mb-4 animate-magical-glow">
                Awakening the Magic Mirror...
              </h2>
              <div className="text-lg opacity-80">
                {!isModelReady ? "Loading mystical powers..." : "Seeking the fairest of them all..."}
              </div>
            </div>
          )}

          {detectedPerson === 'sreemrudu' && (
            <SreemruduMode emotion={emotion} />
          )}

          {detectedPerson === 'other' && (
            <TrollMode />
          )}

          {detectedPerson === 'none' && (
            <div className="text-center text-primary">
              <h2 className="text-2xl font-bold mb-4 animate-magical-glow">
                Mirror, mirror on the wall...
              </h2>
              <p className="text-lg opacity-80">
                Who will be the fairest of them all?
              </p>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="absolute bottom-4 right-4 pointer-events-auto">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
              className="bg-card/80 backdrop-blur-sm border-primary/30"
            >
              🔮 Retry Magic
            </Button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="absolute top-4 left-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded p-2 pointer-events-auto">
          <div>Status: {detectedPerson}</div>
          <div>Emotion: {emotion}</div>
          <div>Model: {isModelReady ? 'Ready' : 'Loading'}</div>
          <div className="mt-1 text-accent text-[10px]">
            Press 1: Sreemrudu | 2: Other | 3: None
          </div>
        </div>
      </Card>
    </div>
  );
};