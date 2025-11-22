import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from './ThemeContextProvider';

const Reports = () => {
  const { transactions } = useSelector(state => state.transactions);
  const { isDark } = useTheme();

  const monthlyData = useMemo(() => {
    const months = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!months[month]) {
        months[month] = { month, income: 0, expense: 0 };
      }
      
      if (t.type === 'Income') {
        months[month].income += t.amount;
      } else {
        months[month].expense += t.amount;
      }
    });
    
    return Object.values(months).sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [transactions]);

  const categoryAnalysis = useMemo(() => {
    const categories = {};
    let totalExpense = 0;
    
    transactions
      .filter(t => t.type === 'Expense')
      .forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
        totalExpense += t.amount;
      });
    
    const highest = Object.entries(categories).reduce((max, [cat, amount]) => 
      amount > max.amount ? { category: cat, amount } : max, 
      { category: 'None', amount: 0 }
    );
    
    return { categories, highest, totalExpense };
  }, [transactions]);

  const averageDailySpending = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    if (expenses.length === 0) return 0;
    
    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const dates = [...new Set(expenses.map(t => t.date))];
    
    return dates.length > 0 ? totalExpense / dates.length : 0;
  }, [transactions]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Reports & Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Highest Spending Category</h3>
          <p className="text-2xl font-bold text-red-600">{categoryAnalysis.highest.category}</p>
          <p className="text-sm text-gray-500">${categoryAnalysis.highest.amount.toFixed(2)}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Average Daily Spending</h3>
          <p className="text-2xl font-bold text-orange-600">${averageDailySpending.toFixed(2)}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Total Categories</h3>
          <p className="text-2xl font-bold text-blue-600">{Object.keys(categoryAnalysis.categories).length}</p>
        </div>
      </div>

      <div className={`p-6 rounded-lg shadow-md mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-xl font-semibold mb-4">Monthly Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expense" fill="#EF4444" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(categoryAnalysis.categories).map(([category, amount]) => {
            const percentage = categoryAnalysis.totalExpense > 0 ? (amount / categoryAnalysis.totalExpense) * 100 : 0;
            return (
              <div key={category} className="flex items-center justify-between">
                <span className="font-medium">{category}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm w-16 text-right">${amount.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 w-12 text-right">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;