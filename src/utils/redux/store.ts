import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  createStore,
  ThunkAction,
} from "@reduxjs/toolkit"
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper"
import { userReducer } from "./parts/user"
import { persistStore, persistReducer } from "redux-persist"
// use localStorage as a store
import storage from "redux-persist/lib/storage"

const combinedReducer = combineReducers({
  user: userReducer,
})

const reducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

// export const makeStore = () =>
//   configureStore({
//     reducer,
//   })
export const makeStore = () => {
  const isServer = typeof window === "undefined"

  if (isServer) {
    // if it's running on the server, then make a store
    return configureStore({
      reducer,
    })
  } else {
    const persistConfig = {
      key: "nextData",
      storage,
    }
    const persistedReducer = persistReducer(persistConfig, reducer)
    const store = configureStore({
      reducer: persistedReducer,
      preloadedState: {
        user: {
          user: null,
		  application: null,
		  extraData: null,
        },
      },
    })

    // @ts-expect-error __PERSISTOR is not default so ts will complain otherwise
    store.__PERSISTOR = persistStore(store)

    return store
  }
}

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store["dispatch"]
export type RootState = ReturnType<Store["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper(makeStore)
