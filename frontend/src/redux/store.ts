import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import expensesReducer from './slices/expensesSlice';
import transactionsReducer from './slices/transactionsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    expenses: expensesReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
