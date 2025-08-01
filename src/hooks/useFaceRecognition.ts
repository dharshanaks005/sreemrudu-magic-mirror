import { useCallback, useRef, useState } from "react";
import * as faceapi from 'face-api.js';
import { PersonDetectionState, EmotionState } from "../components/MagicMirror";

export const useFaceRecognition = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modelLoadedRef = useRef(false);

  // Initialize Face API models
  const initializeFaceAPI = useCallback(async () => {
    if (modelLoadedRef.current) return;
    
    setIsLoading(true);
    try {
      // Load face detection and recognition models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]);
      
      modelLoadedRef.current = true;
      setIsInitialized(true);
      console.log('Face API models loaded successfully');
    } catch (error) {
      console.warn('Face API models not found, using simulated detection');
      // Fall back to simulated detection if models aren't available
      modelLoadedRef.current = true;
      setIsInitialized(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Detect if person is Sreemrudu or someone else
  const detectPerson = useCallback(async (video: HTMLVideoElement): Promise<PersonDetectionState> => {
    if (!isInitialized || !video) return 'none';

    try {
      // Use face-api.js for detection if available
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        return 'none';
      }

      // Since we don't have actual training data for Sreemrudu,
      // we'll simulate the detection for demo purposes
      // In a real implementation, you would:
      // 1. Train a face recognition model with Sreemrudu's photos
      // 2. Compare face descriptors against the trained model
      // 3. Use a threshold to determine if it's a match

      // For now, we'll use a simple random simulation with some logic
      const faceDescriptor = detections[0].descriptor;
      const simulatedMatch = simulatePersonRecognition(faceDescriptor);
      
      return simulatedMatch;
    } catch (error) {
      console.error('Face detection error:', error);
      // Fallback to random simulation
      return Math.random() > 0.7 ? 'sreemrudu' : 'other';
    }
  }, [isInitialized]);

  // Detect emotion
  const detectEmotion = useCallback(async (video: HTMLVideoElement): Promise<EmotionState> => {
    if (!isInitialized || !video) return 'neutral';

    try {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length === 0) {
        return 'neutral';
      }

      const expressions = detections[0].expressions;
      
      // Determine primary emotion
      if (expressions.happy > 0.6) return 'happy';
      if (expressions.sad > 0.6) return 'sad';
      
      return 'neutral';
    } catch (error) {
      console.error('Emotion detection error:', error);
      // Fallback to random emotion
      const emotions: EmotionState[] = ['happy', 'sad', 'neutral'];
      return emotions[Math.floor(Math.random() * emotions.length)];
    }
  }, [isInitialized]);

  return {
    initializeFaceAPI,
    detectPerson,
    detectEmotion,
    isInitialized,
    isLoading
  };
};

// Simulated person recognition (for demo purposes)
// In reality, this would use trained face descriptors
function simulatePersonRecognition(faceDescriptor: Float32Array): PersonDetectionState {
  // Simple simulation logic based on some face descriptor values
  // This is just for demo - real implementation would use proper face matching
  const sum = Array.from(faceDescriptor).reduce((a, b) => a + b, 0);
  const avg = sum / faceDescriptor.length;
  
  // Arbitrary threshold for simulation
  if (avg > 0.1 && avg < 0.3) {
    return 'sreemrudu';
  } else {
    return 'other';
  }
}