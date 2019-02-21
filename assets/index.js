
import Search from './components/select/select.js';
import SimpleTable from './components/table/table';
import React from 'react';
import ReactDOM from 'react-dom';

let name = localStorage.getItem('userSelect');

document.addEventListener('DOMContentLoaded', function(){
  const button = document.getElementsByTagName('Button')[0];
  
  button.addEventListener('click', function() {
  name = localStorage.getItem('userSelect');

  ReactDOM.render(<SimpleTable mentor={name}/>, window.document.getElementById('table'));
  })
});

ReactDOM.render(<Search />, window.document.getElementById('search'));
ReactDOM.render(<SimpleTable mentor={name}/>, window.document.getElementById('table'));
