// src/StockPrice.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import DraggableWrapper from './DraggableWrapper'; // Import the new wrapper

const StockPrice = () => {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [error, setError] = useState('');
  const draggableRef = useRef(null); // Create a ref for the draggable component

  const fetchStockPrice = async () => {
    const API_KEY = 'BG263RR0XA2OG80S'; // Replace with your actual API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const timeSeries = response.data['Time Series (5min)'];
      const latestTime = Object.keys(timeSeries)[0];
      const latestPrice = timeSeries[latestTime]['1. open'];
      setPrice(latestPrice);
      setError('');
    } catch (err) {
      setError('Failed to fetch stock price. Please check the stock symbol and try again.');
      setPrice(null);
    }
  };

  return (
    <DraggableWrapper nodeRef={draggableRef}>
      <div ref={draggableRef} className="draggable-container">
        <h1>Stock Price Checker</h1>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button onClick={fetchStockPrice}>Get Stock Price</button>
        {price && <h2>Current Price: ${price}</h2>}
        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      </div>
    </DraggableWrapper>
  );
};

export default StockPrice;

