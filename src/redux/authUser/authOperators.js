import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, storage } from "../../firebase/firebaseConfig";


const uploadAvatar = async (storageRef, file) => {
  try {
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (error) {
    error.statusError = true
    return error
  }
};

//================================================================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ login, email, password, imageBlob }, thunkAPI) => {
    let photoURL = null;
    let storageRef = null;

    try {
      if (imageBlob) {
        storageRef = ref(storage, `avatar/${imageBlob.data.name}`);
        photoURL = await uploadAvatar(storageRef, imageBlob);
        if (photoURL?.statusError) return thunkAPI.rejectWithValue(photoURL);
      }

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL,
      });

      return {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        displayName: auth.currentUser.displayName,
        isAnonymous: auth.currentUser.isAnonymous,
        photoURL: auth.currentUser.photoURL,
        createdAt: auth.currentUser.createdAt,
        lastLoginAt: auth.currentUser.lastLoginAt,
        apiKey: auth.currentUser.apiKey,
        appName: auth.currentUser.appName,
      }

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//================================================================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // console.log(JSON.stringify(auth.currentUser, undefined, 4));
      // console.log(JSON.stringify(userCredential._tokenResponse, undefined, 4));

      return {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        emailVerified: auth.currentUser.emailVerified,
        displayName: auth.currentUser.displayName,
        isAnonymous: auth.currentUser.isAnonymous,
        photoURL: auth.currentUser.photoURL,
        createdAt: auth.currentUser.createdAt,
        lastLoginAt: auth.currentUser.lastLoginAt,
        apiKey: auth.currentUser.apiKey,
        appName: auth.currentUser.appName,
      }

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//================================================================
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (thunkAPI) => {
    try {
      await auth.signOut();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

//================================================================
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (currentUser) => {
    return currentUser;
  }
);

export const updateUserAvatar = createAsyncThunk(
  "auth/addUserAvatar",
  async ({ uploadBlob = null, delImg = null }, thunkAPI) => {
    try {
      let photoURL = '';
      if (uploadBlob) {
        const storageRef = ref(storage, `avatar/${uploadBlob.data.name}`);
        photoURL = await uploadAvatar(storageRef, uploadBlob);
        if (photoURL?.statusError) return thunkAPI.rejectWithValue(photoURL);
      }

      if (delImg) {
        const desertRef = ref(storage, delImg);
        await deleteObject(desertRef);
      }

      const user = auth.currentUser;
      if (user) {
        await updateProfile(user, {
          photoURL,
        });
        await user.reload();
      }
      
      return user.photoURL
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
