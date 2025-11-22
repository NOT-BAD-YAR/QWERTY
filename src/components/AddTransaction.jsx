import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from './redux/transactionSlice';
import { useTheme } from './ThemeContextProvider';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    date: '',
    type: 'Expense',
    category: 'Food',
    amount: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const categories = ['Food', 'Travel', 'Bills', 'Shopping', 'Others', 'Salary'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) newErrors.date = 'Date is required';
    if (new Date(formData.date) > new Date()) newErrors.date = 'Date cannot be in the future';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Amount must be a positive number';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      }));
      
      setMessage('Transaction added successfully!');
      setFormData({
        date: '',
        type: 'Expense',
        category: 'Food',
        amount: '',
        description: ''
      });
      
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add Transaction</h2>
      
      {message && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      
      <div className={`max-w-md mx-auto p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${errors.date ? 'border-red-500' : ''}`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${errors.amount ? 'border-red-500' : ''}`}
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;