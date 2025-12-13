// --- CONSTANTES PARTAGÉES ---
export const BAR_HEIGHT = 90;

// hauteur du bord blanc aux extrémités
const EDGE_Y = 35;

// hauteur du bord blanc au début du trou (plus haut)
const NOTCH_EDGE_Y = 8;

// taille du bouton orange
const BUTTON_SIZE = 55;

// profondeur max du trou (plus la valeur est grande, plus ça descend)
const NOTCH_DEPTH = 55;

// rayon “virtuel” du trou -> un peu plus grand que le bouton
const NOTCH_RADIUS = BUTTON_SIZE / 2 + 6;

// rayon des coins arrondis (fillet) à l'entrée du trou
const CORNER_RADIUS = 12;

export const TAB_BAR_CONSTANTS = {
  BAR_HEIGHT,
  BUTTON_SIZE,
  CORNER_RADIUS,
  EDGE_Y,
  NOTCH_DEPTH,
  NOTCH_EDGE_Y,
  NOTCH_RADIUS,
};
