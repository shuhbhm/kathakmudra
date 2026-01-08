export const STREAM_CONFIG = {
  // Inference control
  TARGET_FPS: 24,              // change freely (5, 8, 10, 12)
  CONF_THRESHOLD: 0.95,       // 0.90, 0.95, 0.97 etc

  // Frame processing
  FRAME_WIDTH: 416,
  FRAME_HEIGHT: 416,

  // Encoding
  JPEG_QUALITY: 0.75,

  // Gallery
  MAX_GALLERY_FRAMES: 15,
};
