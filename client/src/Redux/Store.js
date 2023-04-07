import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import ClientAuthNoPersist from "./ClientAuth";
import AdminAuthNoPersist from "./AdminAuth";
import OwnerAuthNoPersist from "./OwnerAuth";

const persistConfig = { key: 'user', storage, version: 1 };
const ownerPersistConfig = { key: 'owner', storage, version: 1 };
const adminPersistConfig = { key: 'admin', storage, version: 1 };

const ClientAuth = persistReducer(persistConfig,ClientAuthNoPersist)
const AdminAuth = persistReducer(ownerPersistConfig,AdminAuthNoPersist)
const OwnerAuth = persistReducer(adminPersistConfig,OwnerAuthNoPersist)

export const Store = configureStore({
    reducer: {
        Client: ClientAuth,
        Admin: AdminAuth,
        Owner: OwnerAuth
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});


export const persistor = persistStore(Store)