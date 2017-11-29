import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import StockInfo from './components/StockInfo'

class App extends Component {
  state = {
    quote: {
      symbol: 'NFLX',
      companyName: 'Netflix Inc',
      primaryExchange: 'Nasdaq Global exchange',
      latestPrice: 188.5,
      latestSource: 'Close',
      week52High: 204.38,
      week52Low: 113.95
    }
  }


  render() {
    const { quote } = this.state

    return (
      <div className="App">
        <h1>Wolf Of React</h1>
        <StockInfo
          { ...quote }   // flattern object
        />
      </div>
    );
  }
}

export default App;
