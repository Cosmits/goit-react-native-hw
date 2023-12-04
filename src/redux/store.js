import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { authUserReducer } from "./authUser/authSlice";
import { devToolsEnhancer } from '@redux-devtools/remote';

// import { postUserReducer } from "./posts/postsSlice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, authUserReducer),
    // post: postUserReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // https://stackoverflow.com/questions/76595014/redux-devtools-with-expo-49-beta-react-native-hermes-engine
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
  enhancers: [devToolsEnhancer({
    name: Platform.OS,
    port: 8000,
    secure: false,
    realtime: true,
  })],
});

export const persistor = persistStore(store);