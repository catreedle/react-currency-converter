import React from "react";
import Logo from "./images/logo.png"

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.cached = {};
    this.state = {
      base: "IDR",
      target: "EUR",
      value: 0,
      converted: 0,
      currencies: []
    };
  }

  componentDidMount() {
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          currencies: [...Object.keys(data.rates), "EUR"]
        })
        
      })
  }

  render() {
    return (
      <div>
        <header>
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
        </div>
      </div>
    );
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
