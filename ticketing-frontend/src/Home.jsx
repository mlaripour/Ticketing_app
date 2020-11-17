import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }
  
  componentDidMount() {
    fetch('/api/home')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }
  
  render() {
    return (               
                    <div class="main-head">
                      <h2>{this.state.message}</h2>                   
                    </div>                  
    );
  }
}