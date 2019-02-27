
import Search from './components/select/select.js';
import SimpleTable from './components/table/table';
import Colors from './components/colors/colors';
import React from 'react';
import ReactDOM from 'react-dom';
import mentors from '../assets/data/mentors.json'

let name = localStorage.getItem('userSelect');
let mentorsGitHub = getGitHub(name);;

document.addEventListener('DOMContentLoaded', function(){
  const button = document.getElementsByTagName('Button')[0];

  button.addEventListener('click', function() {
  name = localStorage.getItem('userSelect');
  mentorsGitHub = getGitHub(name);

  ReactDOM.render(<SimpleTable mentor={name} mentorsGit={mentorsGitHub}/>, window.document.getElementById('table'));
  })
});

function getGitHub(name) {
  for (let key in mentors) {
    if (key === name) {
      mentorsGitHub = mentors[key].github;
      break;
    }
  }
  return mentorsGitHub;
}

ReactDOM.render(<Search />, window.document.getElementById('search'));
ReactDOM.render(<Colors />, window.document.getElementById('colors'));
ReactDOM.render(<SimpleTable mentor={name}  mentorsGit={mentorsGitHub}/>, window.document.getElementById('table'));
