import { createSlice } from '@reduxjs/toolkit';
import mockData from '../../data/transactions.json';

const initialState = {
  transactions: mockData,
  filteredTransactions: mockData,
  searchTerm: '',
  categoryFilter: 'All',
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const newTransaction = { ...action.payload, id: Date.now() };
      state.transactions.push(newTransaction);
      state.filteredTransactions = state.transactions;
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      state.filteredTransactions = state.transactions;
    },
    filterTransactions: (state, action) => {
      const { searchTerm, categoryFilter } = action.payload;
      state.searchTerm = searchTerm;
      state.categoryFilter = categoryFilter;
      
      let filtered = state.transactions;
      
      if (searchTerm) {
        filtered = filtered.filter(t => 
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (categoryFilter !== 'All') {
        filtered = filtered.filter(t => t.category === categoryFilter);
      }
      
      state.filteredTransactions = filtered;
    },
  },
});

export const { addTransaction, deleteTransaction, filterTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;