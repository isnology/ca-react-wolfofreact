import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'


class App extends Component {
  state = {
    error: null,
    quote: null
  }

  // the first time our component is rendered
  // this method is called
  componentDidMount() {
    loadQuoteForStock('nflxxx')
    .then((quote) => {
      this.setState({ quote: quote })
    })
    .catch((error) => {
      if (error.response.status === 404)
        error = new Error('The stock symbol does not exist')
      this.setState({ error: error })
      console.error('Error loading quote', error)
    })
  }

  render() {
    const { error, quote } = this.state

    return (
      <div className="App">
        <h1>Wolf Of React</h1>
        { !!error &&
          <p>{ error.message }</p>
        }
        {
          !!quote ? (
            <StockInfo
              { ...quote }   // flattern object
            />
          ) : (
            <p>Loading...</p>
          )
        }

      </div>
    );
  }
}

export default App;
