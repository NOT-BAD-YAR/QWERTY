import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import { ThemeProvider } from './components/ThemeContextProvider';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import TransactionHistory from './components/TransactionHistory';
import Reports from './components/Reports';
import About from './components/About';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddTransaction />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;