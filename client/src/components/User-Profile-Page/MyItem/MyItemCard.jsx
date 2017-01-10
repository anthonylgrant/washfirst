import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AlertContainer from 'react-alert';

import ViewCard from './ViewCard.jsx';
import EditCard from './EditCard.jsx';

class MyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      item: this.props.item,
      img_url: this.props.item.img_url,
      type: this.props.item.type,
      gender: this.props.item.gender,
      size: this.props.item.size,
      tags: this.props.item.tags.join(' '),
      description: this.props.item.description,
    };
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
    this.editView = this.editView.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToggleView = this.handleToggleView.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  showAlert(content, type) {
    msg.show(content, {
      time: 2000,
      type: type,
      icon: this.icons[type]
    });
  }


  handleToggleView() {
    this.setState({ edit: !this.state.edit });
  }


  handleChange(e) {
    e.preventDefault();
    let key = e.target.name;
    let obj = {};
    obj[key] = key === "img_url" ? e.target.value.replace(/C:\\fakepath\\/, "../../../../public/images/user-seeded-items/") : e.target.value;
    this.setState(obj);
  }


  handleUpdate(e) {
    e.preventDefault();
    let updatedItem = {
      id: this.state.item.id,
      img_url: this.state.img_url,
      type: this.state.type,
      gender: this.state.gender,
      size: this.state.size,
      tags: this.state.tags,
      description: this.state.description
    };
    this.showAlert('Item updated.', 'info');

    $.ajax({
      method: 'POST',
      url: `/api/users/some_username/items/${this.state.item.id}`,
      data: JSON.stringify(updatedItem),
      dataType: "text",
      contentType: "application/json; charset=utf-8",
      success: (response) => {
        this.showAlert('Item updated.', 'info');
        this.setState({
          item: {
            ...this.state.item,
            img_url: this.state.img_url,
            type: this.state.type,
            gender: this.state.gender,
            size: this.state.size,
            tags: this.state.tags,
            description: this.state.description
          }
        });
      },
    });

    this.setState({
      item: Object.assign({}, this.state.item, updatedItem, {tags: this.state.tags.split(' ')})
    });

    this.handleToggleView();
  }


  validateForm() {
    return (this.state.img_url && this.state.type && this.state.gender && this.state.size && this.state.tags);
  }


  editView() {
    return (
      <EditCard img_url={this.state.img_url}
                type={this.state.type}
                gender={this.state.gender}
                size={this.state.size}
                tags={this.state.tags}
                description={this.state.description}
                handleChange={this.handleChange}
                handleToggleView={this.handleToggleView}
                handleUpdate={this.handleUpdate}
                deleteItem={() => this.props.deleteItem(this.state.item.id)}
                validateForm={this.validateForm}
      />
    );
  }


  defaultView() {
    return (
      <ViewCard item={this.state.item} handleToggleView={this.handleToggleView} username={this.props.username} />
    );
  }


  selectView() {
    if (this.state.edit) return this.editView();
    else return this.defaultView();
  }


  render() {
    return this.selectView();
  }
};

export default MyItem;
