import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
};

export const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    calculateTotals: (state, action) => {
      const transactions = action.payload;
      state.totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
      state.totalExpense = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
      state.balance = state.totalIncome - state.totalExpense;
    },
  },
});

export const { calculateTotals } = balanceSlice.actions;
export default balanceSlice.reducer;