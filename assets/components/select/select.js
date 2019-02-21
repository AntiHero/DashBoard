import './select.css';
import _ from 'lodash';
import React from 'react';
import Select from 'react-select';
import mentors from '../../data/mentors.json';
import Button from 'react-bootstrap/Button';

let options = [];
const githubs = [];
const names = [];

for(let key in mentors) {
  const name = key.split(/\s+/);
  const firstN = name[0].toLowerCase().charAt(0).toUpperCase() 
              + name[0].toLowerCase().slice(1);
  const secondN = name[1].toLowerCase().charAt(0).toUpperCase() 
              + name[1].toLowerCase().slice(1);
  const nameObj = { value: `${key}`, label:`${firstN + ' ' + secondN}`};
  const githubObj = { value: `${key}`, 
  label:`${(_.words(mentors[key].github, /[^/]+/g))[2].toLowerCase()}`};

  names.push(nameObj);
  githubs.push(githubObj);
}

options = names.concat(githubs);

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: {value: '', label: ''},
    }

    this.handleChange = (selectedOption) => {
      this.setState({ selectedOption });
    }
  }

  render() {
    if(this.state.selectedOption.value !== '') {
      localStorage.setItem('userSelect', this.state.selectedOption.value);
    } 
    return (
      <div className="wrapper"> 
        <Select id="searchBox" 
          options={options}
          placeholder="Search for mentor..."
          onChange={this.handleChange}
        />
        <Button className="create" variant="secondary">Create</Button>
    </div>
    );
  }
}
