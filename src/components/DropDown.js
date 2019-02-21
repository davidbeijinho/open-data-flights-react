import React from 'react';

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.list[0].value };
    this.props.onUpdate(this.state.value);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.onUpdate(this.state.value);
  }
  render() {
    return (
      <React.Fragment>
        <label htmlFor={this.props.id}>{this.props.title}</label>
        <select
          id={this.props.id}
          onChange={this.handleChange}
          value={this.state.value}
        >
          {this.props.list.map(item => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </React.Fragment>
    );
  }
}

export default DropDown;
