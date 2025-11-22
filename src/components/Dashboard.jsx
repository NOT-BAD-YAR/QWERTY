import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { calculateTotals } from './redux/balanceSlice';
import { useTheme } from './ThemeContextProvider';

const Dashboard = () => {
  const { transactions } = useSelector(state => state.transactions);
  const { totalIncome, totalExpense, balance } = useSelector(state => state.balance);
  const dispatch = useDispatch();
  const { isDark } = useTheme();

  useEffect(() => {
    dispatch(calculateTotals(transactions));
  }, [transactions, dispatch]);

  const expenseRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 0;

  const categoryData = useMemo(() => {
    const categories = {};
    transactions
      .filter(t => t.type === 'Expense')
      .forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Wallet Balance</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpense.toFixed(2)}</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg font-semibold mb-2">Expense Ratio</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div 
              className="bg-red-600 h-2.5 rounded-full" 
              style={{ width: `${Math.min(expenseRatio, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm">{expenseRatio.toFixed(1)}%</p>
        </div>
      </div>

      {categoryData.length > 0 && (
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-xl font-semibold mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;