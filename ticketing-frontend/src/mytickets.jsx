import React, { Component } from 'react';

export default class mytickets extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...',
      mytickets:[]
    }
  }

  componentDidMount() {
    fetch('/api/mytickets')
      .then(res => res.json())
      .then(res => this.setState({mytickets: 
        res.tickets.map((ticket)=>{return (<p class="_btn_05">(({ticket.name})) sent 
        by {ticket.created_by} at {ticket.date}</p>)})})
        );            
  }

  render() {   
    console.log(this.state.mytickets);   
    return (
      <div>            
        <p>{this.state.mytickets}</p>    
      </div>
    );
}
}