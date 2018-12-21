import React, { Component } from "react";

class RoleChange extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="role-change"
        onChange={e => this.props.updateRole(event.target.value)}
      >
        <p> Role Selector </p>
        <br />
        <input type="radio" value="Admin" name="gender" />
        Admin (can edit and delete) <br />
        <input
          style={{ marginTop: "6px" }}
          type="radio"
          value="Editor"
          name="gender"
        />
        Editor (can only edit) <br />
        <input
          style={{ marginTop: "6px" }}
          type="radio"
          value="Viewer"
          name="gender"
        />
        Viewer (default, can only view) <br />
      </div>
    );
  }
}

export default RoleChange;
