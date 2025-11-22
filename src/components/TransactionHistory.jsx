import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, filterTransactions } from './redux/transactionSlice';
import { useTheme } from './ThemeContextProvider';

const TransactionHistory = () => {
  const { filteredTransactions, searchTerm, categoryFilter } = useSelector(state => state.transactions);
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const categories = ['All', 'Food', 'Travel', 'Bills', 'Shopping', 'Others', 'Salary'];

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [filteredTransactions, sortBy, sortOrder]);

  const handleSearch = (e) => {
    dispatch(filterTransactions({
      searchTerm: e.target.value,
      categoryFilter
    }));
  };

  const handleCategoryFilter = (e) => {
    dispatch(filterTransactions({
      searchTerm,
      categoryFilter: e.target.value
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Transaction History</h2>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by description or category..."
          value={searchTerm}
          onChange={handleSearch}
          className={`flex-1 p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
        />
        <select
          value={categoryFilter}
          onChange={handleCategoryFilter}
          className={`p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('date')}
                >
                  Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Category
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('amount')}
                >
                  Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedTransactions.map((transaction) => (
                <tr key={transaction.id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'Income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedTransactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;