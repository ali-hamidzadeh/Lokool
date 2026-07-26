export type CompressionMode =
  | "high-quality"
  | "recommended"
  | "max-compression";

export interface CompressionPreset {
  mode: CompressionMode;
  maxSizeMB: number;
  maxWidthOrHeight: number;
}

export const COMPRESSION_PRESETS: Record<CompressionMode, CompressionPreset> = {
  "high-quality": {
    mode: "high-quality",
    maxSizeMB: 3,
    maxWidthOrHeight: 2800,
  },
  recommended: {
    mode: "recommended",
    maxSizeMB: 1.5,
    maxWidthOrHeight: 2000,
  },
  "max-compression": {
    mode: "max-compression",
    maxSizeMB: 0.6,
    maxWidthOrHeight: 1600,
  },
};

export const DEFAULT_COMPRESSION_MODE: CompressionMode = "recommended";
