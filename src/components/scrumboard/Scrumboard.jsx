import React, { Component } from "react";
import Data from "../../static/data";
import Tasks from "../tasks/Tasks";
import AddTask from "./AddTask";
import "./Scrumboard.css";
import Users from "../users/Users";
import axios from "axios";

export class Scrumboard extends Component {
  //the constructor and super keywords are use so we can access the "this" keyword
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      isOpen: false,
      //tasks is an open array and what will be passed in it are the inputed
      //tasks
      tasks: [],
      loading: true,
    };
  }
  addTask = (task) => {
    task.id = Math.random().toString(36).slice(2, 9);
    let tasks = [...this.state.tasks, task];
    this.setState({ tasks });
  };
  deleteTask = (id) => {
    const tasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks });
  };

  componentDidMount() {
    axios
      .get("http://liveapi.chatscrum.com/scrum/api/scrumgoals/")
      .then((res) => {
        console.log(res);
        this.setState({
          tasks: res.data,
        });
      });
  }
  render() {
    console.log("logged in as ", Data.fullname);
    return (
      <div className="scrumboard">
        <nav className="nav">
          <h1>Chatscrum</h1>
          <div className="var">
            <p>User type:{Data.usertype}</p>
            <p>Project Name:{Data.projectname}</p>
          </div>
        </nav>
        <p id="info">Hello {Data.fullname} welcome to your scrumboard</p>

        <Tasks data={this.state.tasks} deleteTask={this.deleteTask} />
        {/* <AddTask addTask={this.addTask} /> */}
        <Users />
      </div>
    );
  }
}

export default Scrumboard;
