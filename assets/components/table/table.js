import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import mentors from '../../data/mentors.json';
import score from '../../data/score.json';
import _ from 'lodash';

export const colors = {
  checked: '#b5e7a0',
  todo: '#d9d9d9',
  working: 'yellow',
  checking: 'pink',
  wasted: 'red'
}

const color = colors.notChked;
const url = "https://github.com/"

const styles = theme => ({
  root: {
    width: '91vw',
    height: '100%',
    marginTop: '50px',
    marginBottom: '100px',
    overflowX: 'hidden',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;
function createStudent(name) {
  id += 1;
  return {id, name};
}

function createStatus(tasks) {
  return [...tasks];
}

let tasks = [];
function createTaskList(data) {
  const arr = [];

  for (let i = 0; i < data.length; i++) {
    arr.push(data[i][1]);
  }
  
  tasks = [...new Set(arr)];
  return tasks;
}

const students = [];
const statuses = [];

function createMarks(name) {
  students.length = 0;
  statuses.length = 0;
  const temp = Array.from(score);

  let group = {};

  for (let key in mentors) {
    if (key === name) {
      group = mentors[key].students;
      break;
    }
  }

  tasks = createTaskList(score);
  console.log(tasks)

  let taskList = [];

  for (let i = 0; i < tasks.length; i++) {
    taskList[i] = `task${i}`;
  }

  let codeJams = [];
  let activist = 0;

  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].search('Jam') !== -1) {
      codeJams.push(i);
    } else if (tasks[i].search('Activist') !== -1) {
      activist = i;
    }
  }

  for (let i = 0; i < group.length; i++) {
    students.push(createStudent(`${group[i]}`));
    for (let i = 0; i < tasks.length; i++) {
      if (i === activist) {
        taskList[i] = colors.todo;
      } else {
        taskList[i] = colors.checking;
      }
    }

    for (let j = 0; j < temp.length; j++) {
      if(temp[j][0].toLowerCase().search(group[i]) !== -1) {
        if(temp[j][1].search('Jam') !== -1) {
          codeJams.forEach((jam) => {
            if(tasks[jam] === temp[j][1]) {
              if(Number(temp[j][3]) > 0) {
                taskList[jam] = colors.checked;
              } else {
                taskList[jam] = colors.wasted;
              }
            }
          })
        } else if (temp[j][1].search('Activist') !== - 1) {
          tasks.forEach((task, index) => {
            if (task.search('Activist') !== -1) {
              if(Number(temp[j][3]) > 0) {
                taskList[index] = colors.checked;
              }
            }
          })
        } else {
          tasks.forEach((task, index) => {
            if(temp[j][1].search(task) !== -1) {
              if(Number(temp[j][3]) > 0) {
                taskList[index] = colors.checked;
              } else {
                taskList[index] = colors.wasted;
              }
            }
          })
        }
      }
    }
    statuses.push(createStatus(taskList));
  }
}



function SimpleTable(props) {
  const { classes } = props;

  createMarks(props.mentor);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{backgroundColor:'gray'}}>
              <TableCell align="center" style={{backgroundColor:'violet', color: 'white'}}><a href={props.mentorsGit} style={{color:'white'}}>{props.mentor}</a></TableCell>
            {tasks.map((task, index) => (
              <TableCell align="center" style={{color:'white', borderLeft: '1px solid white'}} key={index}>{task}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row" style={{border: '1px solid gray'}}>
                <a href={`${url}` + `${student.name}`} style={{color: 'black'}}>{student.name}</a>
              </TableCell>
              {statuses[index].map((status, index) => (
                  <TableCell align="center" style={{backgroundColor:`${status}`, border: '1px solid gray'}} key={`status${index}`}></TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  mentor: PropTypes.string.isRequired,
  mentorsGit: PropTypes.string.isRequired,
};

export default withStyles(styles)(SimpleTable);

