import React, { Component } from 'react';
import './App.css';
import StockInfo from './components/StockInfo'
import { loadQuoteForStock, loadLogo } from './api/iex'


class App extends Component {
  state = {
    error: null,
    enteredSymbol: 'NFLX',
    logoUrl: null,
    quote: null,
    history: [],
    position: 0
  }

  // the first time our component is rendered
  // this method is called
  componentDidMount() {
    this.loadQuote()
  }

  addHistory = (symbol) => {
    const { history } = this.state
    history.push({ symbol: symbol })
    this.setState({ history })
  }

  loadQuote = () => {
    const { enteredSymbol } = this.state

    loadQuoteForStock(enteredSymbol)
    .then((quote) => {
      this.setState({ error: null, quote: quote })
    })
    .catch((error) => {
      if (error.response.status === 404)
        error = new Error(`The stock symbol '${ enteredSymbol }' does not exist`)
      this.setState({ error: error })
      console.error('Error loading quote', error)
    })

    loadLogo(enteredSymbol)
    .then((logoUrl) => {
      this.setState({ logoUrl: logoUrl })
    })

    this.addHistory(enteredSymbol)
  }

  onChangeEnteredSymbol = (event) => {
    this.setState({
      enteredSymbol: event.target.value
    })
  }

  onRoll = (event) => {
    const keyCode = event.keyCode
    const { enteredSymbol, history, position } = this.state
    let pos = position

    if (keyCode === 38) {   // up arrow
      pos += 1
      if (pos >= history.length) {
        pos = history.length - 1
      }
    }
    else if (keyCode === 40) {  // down arrow
      pos -= 1
      if (pos < 0) {
        pos = 0
      }
    }
    else { return }
    this.setState({ enteredSymbol: history[pos].symbol, position: pos })
  }

  render() {
    const { error, enteredSymbol, logoUrl, quote } = this.state

    return (
      <div className="App">
        <h1>Wolf Of React</h1>

        <input type="text"
               value={ enteredSymbol }
               placeholder='symbol e.g. NFLX'
               aria-label='Symbol'
               onKeyUp={ this.onRoll }
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
                logoUrl={ logoUrl }
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

