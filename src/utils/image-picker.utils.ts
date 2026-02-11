import * as ImagePicker from 'expo-image-picker';

// Constantes pour identifier l'erreur de permission
const USER_REJECTED_PERMISSIONS = 'User rejected permissions';
const MAX_SELECTION_LIMIT = 6;
const ASPECT_RATIO: [number, number] = [1, 1];
const QUALITY = 0.5;

// maximum file size
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo

// allowed extensions
const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif'];

/**
 * verify the size of the file
 * @throws {Error} - "image-too-large" if the size exceeds MAX_FILE_SIZE
 */
function verifySize(asset: ImagePicker.ImagePickerAsset) {
  const { fileSize } = asset;
  if (!fileSize || fileSize > MAX_FILE_SIZE) {
    throw new Error('image-too-large');
  }
}

/**
 * verify the file extension
 * @throws {Error} - "file-extension-not-allowed" if the extension is not allowed
 */
function verifyExtension(uri: string) {
  const fileExtension = uri.split('.').pop()?.toLowerCase() || '';
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    throw new Error('file-extension-not-allowed');
  }
}

/**
 * request the permission to access the camera or the library
 * @throws {Error} - "User rejected permissions" if the user refuses
 */
export async function requestAppropriatePermissions(isCamera: boolean) {
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
 * launch the opening of the camera or the gallery, and perform the necessary checks.
 * @returns an array of assets or null if the user cancels.
 * @throws {Error} - Propagated in case of problem (permissions, size, extension…)
 */
export async function pickImageImplementation(
  isCamera: boolean,
  isMultiple: boolean,
): Promise<ImagePicker.ImagePickerAsset[] | null> {
  // check the permissions before everything
  // await requestAppropriatePermissions(isCamera)

  // options for the image picker
  const options: ImagePicker.ImagePickerOptions = {
    allowsEditing: false,
    allowsMultipleSelection: isMultiple,
    aspect: ASPECT_RATIO,
    mediaTypes: ['images'],
    quality: QUALITY,
    selectionLimit: MAX_SELECTION_LIMIT,
  };

  // open the camera or the library
  const result = isCamera
    ? await ImagePicker.launchCameraAsync(options)
    : await ImagePicker.launchImageLibraryAsync(options);

  // if the user cancels or chooses nothing
  if (result.canceled || !result.assets || result.assets.length === 0) {
    return null;
  }

  // verify the size and the extension for each file
  result.assets.forEach(asset => {
    verifySize(asset);
    verifyExtension(asset.uri);
  });
  return result.assets;
}
