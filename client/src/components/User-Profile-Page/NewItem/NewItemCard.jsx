import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AlertContainer from 'react-alert';

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
    this.showAlert = this.showAlert.bind(this);

    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      transition: 'scale'
    };

    this.icons = {
      info: <i className="fa fa-info-circle fa-fw" aria-hidden="true"/>,
      error: <i className="fa fa-exclamation-circle fa-fw" aria-hidden="true"/>
    };
  }

  showAlert(content, type) {
    msg.show(content, {
      time: 2000,
      type: type,
      icon: this.icons[type]
    });
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

    const validateTags = (tagStr) => {
      let allGood = true;
      let tempArr = tagStr.split(' ');
      tempArr.forEach((tag, index) => {
        if(!/^\w+$/.test(tag)) allGood = false;
      });
      return allGood;
    };

    let newItem = {
      img_url: this.state.img_url,
      type: this.state.type,
      gender: this.state.gender,
      size: this.state.size,
      tags: this.state.tags.trim().replace(/\s\s+/g, ' ').toLowerCase(),
      description: this.state.description
    };

    if (validateTags(newItem.tags)) {
      $.ajax({
        method: 'POST',
        url: `/api/users/some_userid/new`,
        data: newItem,
        success: (response) => {
          this.setState({
            edit: false,
            item: 'new',
            img_url: '',
            type: '',
            gender: '',
            size: '',
            tags: '',
            description: ''
          });
          this.props.reload();
        }
      });

    } else {
      this.showAlert('Invalid characters in tags.', 'error');
    }
  }

  emptyField(e) {
    e.preventDefault();
    e.target.value = "";
  }


  validateForm() {
    return (this.state.img_url && this.state.type && this.state.gender && this.state.size && this.state.tags && this.state.description && this.state.description.length <= 140);
  }


  render() {
    return (
      <div>
        <NewCard type={this.state.type} handleChange={this.handleChange} validateForm={this.validateForm} handleNewRequest={this.handleNewRequest} emptyField={this.emptyField} description={this.state.description} />
      </div>
    );
  }
};

export default NewItem;
