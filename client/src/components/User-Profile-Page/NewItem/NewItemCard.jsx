import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import NewCard from './NewCard.jsx';


class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      item: 'new',
      img_url: '',
      type: '',
      gender: '',
      size: '',
      tags: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.emptyField = this.emptyField.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let key = e.target.name;
    let obj = {};
    let value = '';
    obj[key] = key === "img_url" ? e.target.value.replace(/C:\\fakepath\\/, "../../../../public/images/user-seeded-items/") : e.target.value;
    this.setState(obj);
  }


  handleNewRequest(e) {
    e.preventDefault();
    let newItem = {
      img_url: this.state.img_url,
      type: this.state.type,
      gender: this.state.gender,
      size: this.state.size,
      tags: this.state.tags,
      description: this.state.description
    };

    $.ajax({
      method: 'POST',
      url: `/api/users/some_userid/new`,
      data: newItem,
      success: (response) => {
        this.props.reload();
      }
    });

  }

  emptyField(e) {
    e.preventDefault();
    e.target.value = "";
  }


  validateForm() {
    return (this.state.img_url && this.state.type && this.state.gender && this.state.size && this.state.tags && this.state.description);
  }


  render() {
    return (
      <NewCard type={this.state.type} handleChange={this.handleChange} validateForm={this.validateForm} handleNewRequest={this.handleNewRequest} emptyField={this.emptyField} />
    );
  }
};

export default NewItem;
