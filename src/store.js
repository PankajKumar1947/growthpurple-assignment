import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer from './features/todoSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers({
    todo: todoReducer
}));

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);