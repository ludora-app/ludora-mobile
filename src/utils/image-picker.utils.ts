import * as ImagePicker from 'expo-image-picker';
import { getInfoAsync } from 'expo-file-system/legacy';

export const USER_REJECTED_PERMISSIONS = 'User rejected permissions';

const MAX_SELECTION_LIMIT = 6;
const QUALITY = 0.5;

// Maximum file size : 10 Mo
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'];
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);

const AMBIGUOUS_URI_PREFIXES = ['content://', 'ph://', 'assets-library://'];

async function resolveFileSizeBytes(asset: ImagePicker.ImagePickerAsset): Promise<number | undefined> {
  if (typeof asset.fileSize === 'number' && asset.fileSize >= 0) {
    return asset.fileSize;
  }

  try {
    const info = await getInfoAsync(asset.uri);
    if (info.exists && typeof info.size === 'number') {
      return info.size;
    }
  } catch {
    // content:// ou URI non lisible : taille inconnue, on laisse passer
  }

  return undefined;
}

/**
 * @throws {Error} 'image-too-large' si la taille dépasse MAX_FILE_SIZE (quand elle est connue)
 */
async function verifySizeAsync(asset: ImagePicker.ImagePickerAsset): Promise<void> {
  const bytes = await resolveFileSizeBytes(asset);
  if (bytes != null && bytes > MAX_FILE_SIZE) {
    throw new Error('image-too-large');
  }
}

function getUriExtension(uri: string): string {
  const path = uri.split('?')[0];
  if (!path.includes('.')) return '';
  return path.split('.').pop()?.toLowerCase() ?? '';
}

/**
 * Vérifie que l'asset est bien une image autorisée.
 * Stratégie de vérification par ordre de fiabilité :
 *   1. MIME type (le plus fiable)
 *   2. Extension de l'URI
 *   3. fileName fourni par l'asset (Android)
 *   4. URI ambiguë sans MIME → on tolère si rien ne prouve que ce n'est pas une image
 *
 * @throws {Error} 'file-extension-not-allowed'
 */
function verifyImageType(asset: ImagePicker.ImagePickerAsset): void {
  const mime = asset.mimeType?.toLowerCase().split(';')[0]?.trim();

  if (mime) {
    if (ALLOWED_MIME_TYPES.has(mime)) return;
    throw new Error('file-extension-not-allowed');
  }

  const uriExt = getUriExtension(asset.uri);
  if (uriExt && ALLOWED_EXTENSIONS.includes(uriExt)) return;
  if (uriExt && !ALLOWED_EXTENSIONS.includes(uriExt)) {
    throw new Error('file-extension-not-allowed');
  }

  if (asset.fileName) {
    const fileExt = asset.fileName.split('.').pop()?.toLowerCase() ?? '';
    if (fileExt && ALLOWED_EXTENSIONS.includes(fileExt)) return;
    if (fileExt && !ALLOWED_EXTENSIONS.includes(fileExt)) {
      throw new Error('file-extension-not-allowed');
    }
  }

  const isAmbiguous = AMBIGUOUS_URI_PREFIXES.some(prefix => asset.uri.startsWith(prefix));
  if (isAmbiguous) return;

  throw new Error('file-extension-not-allowed');
}

/**
 * Demande les permissions caméra ou médiathèque selon le mode.
 * @throws {Error} USER_REJECTED_PERMISSIONS si l'utilisateur refuse
 */
export async function requestAppropriatePermissions(isCamera: boolean): Promise<void> {
  if (isCamera) {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      throw new Error(USER_REJECTED_PERMISSIONS);
    }
  } else {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      throw new Error(USER_REJECTED_PERMISSIONS);
    }
  }
}

/**
 * Lance la caméra ou la galerie avec les validations nécessaires.
 *
 * @returns Les assets sélectionnés, ou `null` si l'utilisateur annule.
 * @throws {Error} 'camera-not-available' | 'image-too-large' | 'file-extension-not-allowed' | USER_REJECTED_PERMISSIONS
 */
export async function pickImageImplementation(
  isCamera: boolean,
  isMultiple: boolean,
): Promise<ImagePicker.ImagePickerAsset[] | null> {
  await requestAppropriatePermissions(isCamera);

  const allowMultiple = isCamera ? false : isMultiple;

  const options: ImagePicker.ImagePickerOptions = {
    allowsEditing: false,
    allowsMultipleSelection: allowMultiple,
    mediaTypes: ['images'],
    quality: QUALITY,
    selectionLimit: allowMultiple ? MAX_SELECTION_LIMIT : 1,
  };

  let result: ImagePicker.ImagePickerResult;

  try {
    result = isCamera
      ? await ImagePicker.launchCameraAsync(options)
      : await ImagePicker.launchImageLibraryAsync(options);
  } catch (err: unknown) {
    if (isCamera) {
      const message = (err instanceof Error ? err.message : '').toLowerCase();
      const code = (err as { code?: string })?.code ?? '';

      if (
        code === 'ERR_NO_CAMERA' ||
        message.includes('camera not available') ||
        message.includes('no camera') ||
        message.includes('camera missing')
      ) {
        throw new Error('camera-not-available');
      }
    }
    throw err;
  }

  if (result.canceled || !result.assets || result.assets.length === 0) {
    return null;
  }

  // Validation séquentielle : on remonte la première erreur rencontrée
  await result.assets.reduce<Promise<void>>(
    (chain, asset) => chain.then(() => verifySizeAsync(asset)).then(() => verifyImageType(asset)),
    Promise.resolve(),
  );

  return result.assets;
}
