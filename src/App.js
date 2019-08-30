import React from 'react';
import './App.css';

class Count extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          count: 0
      }
  }

  render() {
      return (
          <div>
              <h1>{this.state.count}</h1>
              <button onClick = {this.increment}>Increment</button>
              <button onClick = {this.decrement}>Decrement</button>
          </div>
      )
  }

  componentDidMount() {
    const count = localStorage.getItem('count')

    if (count !== null) {
      this.setState({
        count: parseInt(count)
      })
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('count', this.state.count)
    })
  }

  increment = () => {
      this.setState({
          count: this.state.count + 1
      })
  }

  decrement = () => {
      this.setState({
          count: this.state.count - 1
      })
  }
}



export default Count;
