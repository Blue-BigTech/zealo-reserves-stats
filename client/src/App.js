import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

import MainPage from './pages/MainPage';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if (response.status !== 200) throw Error(body.message);

  //   return body;
  // };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch('/api/world', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ post: this.state.post }),
  //   });
  //   const body = await response.text();

  //   this.setState({ responseToPost: body });
  // };

  render() {
    return (
      <div className="App">
        {/* <form onSubmit={this.handleSubmit}>
          <strong>Post to Server:</strong>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
            />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.response}</p>
        <p>{this.state.responseToPost}</p> */}
        <MainPage />
      </div>
    );
  }
}

export default App;
