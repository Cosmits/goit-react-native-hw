import { manipulateAsync } from "expo-image-manipulator";
import { Image } from "react-native";

// file uri to blob
export const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        if (xhr.status === 0) { resolve(xhr.response) }
        else { reject(new Error("Loading error: uriToBlob")) }
      };
      xhr.onerror = function () {
        reject(new Error("Network error: uriToBlob"));
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

// http url to blob
export function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  });
}

export const compressImage = async (uri, newWidth, newHeight) => {
  const actions = [{ resize: { width: newWidth, height: newHeight } }];
  const result = await manipulateAsync(uri, actions, { compress: 0.5 });
  return result.uri
};

export async function imageExists(url) {
  return Image.prefetch(url)
    .then(() => true)
    .catch(() => false);
}