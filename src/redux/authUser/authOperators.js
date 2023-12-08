import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
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

const formatUserObj = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    isAnonymous: user.isAnonymous,
    photoURL: user.photoURL,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt,
    apiKey: user.apiKey,
    appName: user.appName,
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

      return formatUserObj(auth.currentUser)

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

      return formatUserObj(auth.currentUser)

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
    return formatUserObj(currentUser)
  }
);

//================================================================
export const updateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async ({ uploadBlob = null, delImg = '' }, thunkAPI) => {
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
          photoURL
        });
        await user.reload();
      }

      return formatUserObj(auth.currentUser)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//================================================================
export const sendVerifyEmail = createAsyncThunk(
  "auth/sendVerifyEmail",
  async (thunkAPI) => {
    try {
      await sendEmailVerification(auth.currentUser)

      return "Email verification sent successfully !";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);