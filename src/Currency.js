import React from "react";

class Currency extends React.Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
      base: "USD",
      target: "IDR",
      value: 0,
      converted: 0
    };
  }

  render() {
    return (
      <div>
        <header>
          <h1>Convert Currency</h1>
        </header>
        <div>
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
          <input value={this.state.value} onChange={this.changeValue}/>
        </div>
        <div>
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
    );
  }

  componentDidMount(){
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(response => response.json())
      .then(data => {
          this.setState({
              currencies: [...Object.keys(data.rates)]
          })
      })
  }

  makeSelection = event => this.setState({
      [event.target.name]: [event.target.value]
  },
  this.calculate
  )

  changeValue = event => this.setState({
      value: event.target.value
  },
  this.calculate
  )

  calculate(){
      const value = parseFloat(this.state.value)
      if (isNaN(value)) {
        return
      }
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(response => response.json)
      .then(data =>
        this.setState ({
            converted: data.rates[this.state.target] * value
        }))
  }
}


export default Currency;
