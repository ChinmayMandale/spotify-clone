import { configureStore } from '@reduxjs/toolkit';

import { shazamCoreAPI } from './services/shazamCore';
import playerReducer from './features/playerSlice';

export const store = configureStore({
  // Boiler plate code inside every redux app
  reducer: {
    [shazamCoreAPI.reducerPath]: shazamCoreAPI.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(shazamCoreAPI.middleware),
});
