import React, { Component } from "react";

export class AddTask extends Component {
  state = {
    content: "",
  };

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
      content: e.target.value,
    });
  };
  //when a user inputs text into the text-field, the inputed texts
  //   is then saved as a substate

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false,
    });
    this.props.addTask(this.state);
    this.setState({ content: "" });
  };

  render() {
    return (
      <div className="add-task">
        <div id="modal" className={this.state.isOpen ? "show" : "hidden"}>
          <div className="header">
            <h3 id="heading">Add a new task</h3>
            <h3 id="close" onClick={() => this.closeModal()}>
              X
            </h3>
          </div>
          <form onSubmit={this.handleSubmit} className="form">
            {/* here the onChange function is dynamically adding the task to as its being inputed */}
            <input
              type="text"
              onChange={this.handleChange}
              value={this.state.content}
            />
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

export default AddTask;
