import React, { Component } from "react";
import Data from "../../static/data";
import Tasks from "../tasks/Tasks";
import "./Scrumboard.css";

export class Scrumboard extends Component {
  //the constructor and super keywords are use so we can access the "this" keyword
  constructor() {
    super();
    this.state = {
      data: Data,
      isOpen: false,
      tasks: null,
    };
  }
  //to toggle the tasks input on
  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };
  // to close the task input
  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };
  //to dynamically input a task and save it on the task placeholder
  handleChange = (e) => {
    this.setState({
      //this is telling the program that the tasks  is the value inputed in the input tasks placeholder
      tasks: e.target.value,
    });
  };
  //to auto close the modal when you click submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false,
    });
  };
  render() {
    console.log("logged in as ", Data.fullname);
    return (
      <div className="scrumboard">
        <nav className="navi">
          <h1>Chatscrum</h1>
          <div className="var">
            <p>User type:{Data.usertype}</p>
            <p>Project Name:{Data.projectname}</p>
          </div>
        </nav>
        <p id="info">Hello {Data.fullname} welcome to your scrumboard</p>

        <Tasks />
        <div id="modal" className={this.state.isOpen ? "show" : "hidden"}>
          <div className="header">
            <h3 id="heading">Add a new task</h3>
            <h3 id="close" onClick={() => this.closeModal()}>
              X
            </h3>
          </div>
          <form onSubmit={this.handleSubmit} className="form">
            {/* here the onChange function is dynamically adding the task to as its being inputed */}
            <input type="text" onChange={this.handleChange} />
            <button>Confirm</button>
          </form>
        </div>
        <button className="add" onClick={() => this.openModal()}>
          Add Task
        </button>
      </div>
    );
  }
}

export default Scrumboard;
