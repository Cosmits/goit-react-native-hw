import { manipulateAsync } from "expo-image-manipulator";
import { Image } from "react-native";

export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status === 0) { resolve(xhr.response) }
        else { reject(new Error("Loading error:")) }
      };
      xhr.onerror = function () {
        reject(new Error("Network error."));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    }
    catch (err) {
      reject(err.message)
    }
  });
};

export const compressImage = async (uri, newWidth, newHeight) => {
  const actions = [{ resize: { width: newWidth, height: newHeight } }];
  const result = await manipulateAsync(uri, actions, { compress: 0.5 });
  return result.uri
};

export function imageExists(url) {
  return Image.prefetch(url)
    .then(() => true)
    .catch(() => false);
}