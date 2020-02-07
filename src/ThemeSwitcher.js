import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

class ThemeSwitcher extends Component {
  
  render() {
    return (
      <DropdownButton id="dropdown-item-button" title="Dropdown button">
        <Dropdown.Item as="button">Action</Dropdown.Item>
        <Dropdown.Item as="button">Another action</Dropdown.Item>
        <Dropdown.Item as="button">Something else</Dropdown.Item>
      </DropdownButton>
    );
  } 
}

export default ThemeSwitcher;