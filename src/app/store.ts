import { combineReducers, configureStore } from '@reduxjs/toolkit'
import shopsSlice from './shopSlice'

export const store = configureStore({
  reducer: { shops: shopsSlice }
})

const rootReducer = combineReducers({
  shops: shopsSlice
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const setupStore = (preloadedState: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
