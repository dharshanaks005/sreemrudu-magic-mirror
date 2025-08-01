import { RefObject } from "react";

interface CameraViewProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  stream: MediaStream | null;
  isModelReady: boolean;
}

export const CameraView = ({ videoRef, canvasRef, stream, isModelReady }: CameraViewProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Video Feed */}
      <video
        ref={videoRef}
        className="video-mirror absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
      />

      {/* Canvas for face detection overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ transform: 'scaleX(-1)' }}
      />

      {/* Mirror overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-mirror-glass/5 via-transparent to-mirror-glass/10 pointer-events-none" />
      
      {/* Vintage noise overlay */}
      {isModelReady && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
            `,
            filter: 'blur(1px)'
          }}
        />
      )}

      {/* Loading state */}
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/90 backdrop-blur-sm">
          <div className="text-center text-magical">
            <div className="text-2xl mb-4">🪞</div>
            <h3 className="text-xl font-bold mb-2">Awakening the Mirror</h3>
            <p className="text-muted-foreground">Requesting camera access...</p>
          </div>
        </div>
      )}
    </div>
  );
};