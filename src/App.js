import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock } from './api/iex'


class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'NFLX',
    quote: null
  }

  // the first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote()
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    loadQuoteForStock(enteredSymbol)
    .then((quote) => {
      this.setState({ quote: quote, error: null })
    })
    .catch((error) => {
      if (error.response.status === 404)
        error = new Error(`The stock symbol '${ enteredSymbol }' does not exist`)
      this.setState({ error: error })
      console.error('Error loading quote', error)
    })
  }

  onChangeEnteredSymbol = (event) => {
    this.setState({
      enteredSymbol: event.target.value
    })
  }

  render() {
    const { error, enteredSymbol, quote } = this.state

    return (
      <div className="App">
        <h1>Wolf Of React</h1>

        <input type="text"
               value={ enteredSymbol }
               placeholder='symbol e.g. NFLX'
               aria-label='Symbol'
               onChange={ this.onChangeEnteredSymbol }
        />
        <button
            className='ml-1'
            onClick={ this.loadQuote }
        >
          Load Quote
        </button>

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
