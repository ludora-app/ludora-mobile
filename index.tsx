// Import side effects first and services
import { LogBox } from 'react-native';

// Désactiver toutes les erreurs LogBox pour la vidéo
LogBox.ignoreAllLogs(true);

// Initialize services

// Register app entry through Expo Router
import 'expo-router/entry';
