// lib/preview/devices.ts

export type DevicePreset = {
  id: string;
  label: string;
  width: number;   // CSS px
  height: number;  // CSS px
  userAgentHint?: string; // reserved; not used here but handy if you later spoof UA
};

export const INTEGRITY_COLORS = {
  burgundy: "#7B0F24",
  gold: "#FFD700",
  ivory: "#FFF9F0",
  dark: "#0B0B0B",
};

export const DEVICE_PRESETS: DevicePreset[] = [
  // Common "phone" viewport (iPhone 15-ish)
  { id: "mobile", label: "Mobile (390×844)", width: 390, height: 844 },

  // iPad 12.9 portrait
  { id: "ipad", label: "iPad (1024×1366)", width: 1024, height: 1366 },

  // Modest desktop
  { id: "desktop", label: "Desktop (1280×800)", width: 1280, height: 800 },
];
