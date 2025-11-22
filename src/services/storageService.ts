// src/services/storageService.ts
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * uploadProfileImage expects a Blob or Uint8Array.
 * If using Expo ImagePicker, convert local URI to blob first.
 */
export const uploadProfileImage = async (uid: string, blob: Blob) => {
  const imageRef = ref(storage, `profilePictures/${uid}.jpg`);
  await uploadBytes(imageRef, blob);
  return getDownloadURL(imageRef);
};
