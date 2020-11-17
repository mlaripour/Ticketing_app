import React, { Component } from 'react';
import MultiSelect from "@khanacademy/react-multi-select";



export default class assign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      ticketname:'',
      selected:[]
    }
  }

  componentDidMount() {
    fetch('/api/assign')
      .then(res => res.json())
      .then(res => this.setState({users: res.users}));
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/assign', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        alert('tickets sent');
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error sending tickets');
    });
  }

  render() {
    const {selected} = this.state;
    console.log(this.state.selected);
    return (
      
      <div>
      
      <div class="form-group">
      <form onSubmit={this.onSubmit}>
      <input
          type="text"
          name="ticketname"
          placeholder="ticket name"
          value={this.state.ticketname}
          onChange={this.handleInputChange}
          required
          class="form-control"
        />
        <br></br>
      <MultiSelect
        options={this.state.users}
        selected={selected}
        onSelectedChanged={selected => this.setState({selected})}
      />
      <br></br>
      <div class="form-group">          
            <input class="_btn_04" type="submit" value="send"/>        
        </div>
      </form></div>       
      </div>
    );
  }
}