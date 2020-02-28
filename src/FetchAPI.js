import React from "react";
import Logo from "./images/logo.png";
import { Link } from "react-router-dom"

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.cached = {};
    this.state = {
      base: "IDR",
      target: "EUR",
      value: 0,
      converted: 0,
      currencies: [],
      savedConversion: [],
      savedConversion2: []
    };
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          currencies: [...Object.keys(data.rates)]
        })

      })
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Back to Home</Link>
          <h1>Currency Converter</h1>
          <img src={Logo} alt="logo" height="80%" />
        </header>
        <div className="container">
          <div className="select">
            <select
              onChange={this.makeSelection}
              name="base"
              value={this.state.base}
            >
              {this.state.currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input value={this.state.value} onChange={this.changeValue} />
          </div>
          <div className="select">
            <select
              onChange={this.makeSelection}
              name="target"
              value={this.state.target}
            >
              {this.state.currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <input disabled={true} value={this.state.converted} />
          </div>
          <div>
          <button onClick={this.saveConversion}>Save</button>
          <Link to={{
            pathname: '/saved',
            state: {
              savedConversions: this.state.savedConversion
            }
          }}>Saved Conversions</Link>
          <button onClick={this.saveConversion2}>Save2</button>
          <Link to={{
            pathname: '/saved2',
            state: {
              savedConversion2: this.state.savedConversion2
            }
          }}>Saved Conversions 2</Link>
          </div>
        </div>
      </div>
    );
  }

  saveConversion2 = () => {
    this.setState({
      savedConversion2: [...this.state.savedConversion2, `${this.state.base} ${this.state.value} = ${this.state.target} ${this.state.converted} `]
    })
    console.log(this.state.savedConversion2)
  }

  makeSelection = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.recalculate
    );
  };

  changeValue = event => {
    this.setState(
      {
        value: event.target.value
      },
      this.recalculate
    );
  };

  saveConversion = () => {
    this.setState(
      state => ({
        savedConversion: [...state.savedConversion, `${this.state.value} ${this.state.base} = ${this.state.converted} ${this.state.target}`]
      }))
    console.log(this.state.savedConversion)
  }

  recalculate = () => {
    const value = parseFloat(this.state.value);
    if (isNaN(value)) {
      return;
    }

    if (
      this.cached[this.state.base] !== undefined &&
      Date.now() - this.cached[this.state.base].timestamp < 1000 * 60
    ) {
      this.setState({
        converted: this.cached[this.state.base].rates[this.state.target] * value
      });
      return;
    }
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(response => response.json())
      .then(data => {
        this.cached[this.state.base] = {
          rates: data.rates,
          timestamp: Date.now()
        };

        this.setState({
          converted: data.rates[this.state.target] * value
        });
      });
  };
}


export default Exchange;
