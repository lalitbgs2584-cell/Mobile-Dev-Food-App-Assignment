export type Theme = {
  bg: string;
  bg2: string;
  bgSecondary: string;
  glass: string;
  glass2: string;
  surface: string;
  surfaceStrong: string;
  inputBg: string;
  border: string;
  muted: string;
  primary: string;
  primarySoft: string;
  accent: string;
  text: string;
  textMuted: string;
  glow: string;
  blurTint: 'dark' | 'light';
  blurIntensity: number;
  radius: number;
  track: string;
  knob: string;
  modalOverlay: string;
  modalBg: string;
  editorHeaderOverlay: string;
};

export const darkTheme: Theme = {
  // Main backgrounds
  bg: '#0C0C0D',
  bg2: '#121214',
  bgSecondary: '#18181B',

  // Glass layers
  glass: 'rgba(255,255,255,0.06)',
  glass2: 'rgba(255,255,255,0.03)',

  // Cards
  surface: '#1C1A18',
  surfaceStrong: '#252220',

  // Inputs
  inputBg: '#2A2724',

  // Borders
  border: 'rgba(255,150,40,0.12)',

  // Secondary text
  muted: 'rgba(255,255,255,0.45)',

  // Orange CTA
  primary: '#FF8A1F',
  primarySoft: '#FFAA54',

  // Small highlights
  accent: '#FFB84D',

  // Text
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.62)',

  // Glow around buttons/cards
  glow: 'rgba(255,138,31,0.18)',

  // Blur
  blurTint: 'dark',
  blurIntensity: 40,

  // Rounded corners
  radius: 24,

  // Switches/sliders
  track: '#2A2724',
  knob: '#FF8A1F',

  // Modal
  modalOverlay: 'rgba(0,0,0,0.72)',
  modalBg: '#1A1816',

  // Header blur
  editorHeaderOverlay: 'rgba(12,12,13,0.62)',
};


export const lightTheme: Theme = {
  bg: '#FFF8F1',
  bg2: '#FFF2E5',
  bgSecondary: '#FFEAD6',

  glass: 'rgba(255,255,255,0.65)',
  glass2: 'rgba(255,255,255,0.4)',

  surface: '#FFFFFF',
  surfaceStrong: '#FFF6EE',

  inputBg: '#FFF3E8',

  border: 'rgba(255,138,31,0.1)',

  muted: 'rgba(40,40,40,0.5)',

  primary: '#FF8A1F',
  primarySoft: '#FFAA54',
  accent: '#FFB84D',

  text: '#1A1A1A',
  textMuted: 'rgba(20,20,20,0.58)',

  glow: 'rgba(255,138,31,0.12)',

  blurTint: 'light',
  blurIntensity: 35,

  radius: 24,

  track: '#E5D7CA',
  knob: '#FF8A1F',

  modalOverlay: 'rgba(0,0,0,0.28)',
  modalBg: '#FFFFFF',

  editorHeaderOverlay: 'rgba(255,255,255,0.6)',
};

