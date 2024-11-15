// src/StockPrice.js
import React, { useState } from 'react';
import axios from 'axios';

const StockPrice = () => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');
  const [interval, setInterval] = useState('5min');

  const fetchStockPrice = async () => {
    const API_KEY = 'BG263RR0XA2OG80S'; // Replace with your actual API key

    // Adjust interval based on the selected time frame
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const timeSeries = response.data[`Time Series (${interval})`];
      const latestTime = Object.keys(timeSeries)[0];
      const latestPrice = timeSeries[latestTime]['1. open'];
      setPrice(latestPrice);
      setError('');
    } catch (err) {
      setError('Failed to fetch stock price. Please check the stock symbol and try again.');
      setPrice(null);
    }
  };

  const clearInput = () => {
    setSymbol('');
    setPrice(null);
    setError('');
  };

  return (
    <div className="draggable-container">
      <h1>Stock Price Checker</h1>
      <input
        type="text"
        placeholder="Enter stock symbol (e.g., AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <select value={interval} onChange={(e) => setInterval(e.target.value)}>
        <option value="1min">1 minute</option>
        <option value="30min">30 minutes</option>
        <option value="60min">1 hour</option>
        <option value="240min">4 hours</option>
        <option value="720min">12 hours</option>
        <option value="1440min">24 hours</option>
      </select>
      <button onClick={fetchStockPrice}>Get Stock Price</button>
      <button onClick={clearInput}>Clear</button>
      {price && <h2>Current Price: ${price}</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
    </div>
  );
};

export default StockPrice;