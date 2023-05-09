// import { configureStore } from '@reduxjs/toolkit';
// import { createSlice } from '@reduxjs/toolkit';
// // import { persistStore, persistReducer } from 'reduxjs-toolkit-persist';
// // import storage from 'reduxjs-toolkit-persist/lib/storage';
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from 'redux-persist'
//   import { PersistGate } from 'redux-persist/integration/react'
//   import storage from 'redux-persist/lib/storage'

//   const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
//   }

// // create a slice
// export const isLoadingSlice = createSlice({
//     name: 'isLoadingSlice',
//     initialState: {
//         isLoading: false,
//         token: null,
//     },
//     reducers: {
//         isLoadingTrue: (state) => {
//             state.isLoading = true;
//         },
//         isLoadingFalse: (state) => {
//             state.isLoading = false;
//         },
//         setToken: (state, token) => {
//             state.token = token.payload;
//         },
//     },
// });

// const persistedReducer = persistReducer(persistConfig, isLoadingSlice.reducer)

// // config the store
// // const store = configureStore({
// //     reducer: {
// //         isLoadingReducer: isLoadingSlice.reducer,
// //     },
// // });

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   })

//   let persistor = persistStore(store)

//   export default { store, persistor }
  

// // export default store

// // export default the store
// // export default () => {
// //     let store = createStore(persistedReducer);
// //     let persistor = persistStore(store);
// //     return { store, persistor };
// // };

// // export the action
// export const { isLoadingTrue, isLoadingFalse, setToken } =
//     isLoadingSlice.actions;


import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";
import { omit } from "lodash";

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
  } else {
    //If it's on client side, create a store which will persist
    const {
      persistStore,
      persistReducer,
      createTransform,
      autoMergeLevel2,
    } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const blacklistPaths = [];

    const persistConfig = {
      key: "nextjs",
      storage, // if needed, use a safer storage
      blacklist: blacklistPaths.filter((a) => !a.includes(".")),
      transforms: [
        // nested blacklist-paths require a custom transform to be applied
        createTransform((inboundState, key) => {
          const blacklistPaths_forKey = blacklistPaths
            .filter((path) => path.startsWith(`${key}.`))
            .map((path) => path.substr(key.length + 1));
          return omit(inboundState, ...blacklistPaths_forKey);
        }, null),
      ],

      stateReconciler: autoMergeLevel2,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature

    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
