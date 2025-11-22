import React from 'react';
import { useTheme } from './ThemeContextProvider';

const About = () => {
  const { isDark } = useTheme();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">About E-Wallet Portal</h2>
      
      <div className={`max-w-4xl mx-auto p-8 rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">Overview</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The E-Wallet & Expense Management Portal is a comprehensive financial tracking application 
              built with React.js. It helps users manage their income and expenses, track spending habits, 
              and analyze financial trends through an intuitive dashboard.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Add and categorize income and expense transactions</li>
              <li>Real-time wallet balance calculation</li>
              <li>Interactive charts and visualizations</li>
              <li>Transaction history with search and filter capabilities</li>
              <li>Monthly reports and spending analytics</li>
              <li>Light and dark theme support</li>
              <li>Responsive design for all devices</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-100 dark:bg-blue-900 rounded">
                <p className="font-semibold">React.js</p>
                <p className="text-sm">Frontend Framework</p>
              </div>
              <div className="text-center p-3 bg-purple-100 dark:bg-purple-900 rounded">
                <p className="font-semibold">Redux Toolkit</p>
                <p className="text-sm">State Management</p>
              </div>
              <div className="text-center p-3 bg-green-100 dark:bg-green-900 rounded">
                <p className="font-semibold">React Router</p>
                <p className="text-sm">Navigation</p>
              </div>
              <div className="text-center p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
                <p className="font-semibold">Recharts</p>
                <p className="text-sm">Data Visualization</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;