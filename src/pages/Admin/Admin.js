import React, { Component } from 'react';
import Navbar from '../../component/fragment/Navbar';

export default class Admin extends Component {
  // constructor(){
  //   super()
  // }

  render() {
    return (
      <div>
        <Navbar />
        <h1>Admin Page</h1>
      </div>
    );
  }
}
