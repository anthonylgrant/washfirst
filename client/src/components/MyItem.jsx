// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

// class MyItem extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       edit: false,
//       item: this.props.item,
//       img_url: '../../public/images/default_img.jpg',
//       type: this.props.item.type,
//       gender: this.props.item.gender,
//       size: this.props.item.size,
//       tags: this.props.item.tags.join(' '),
//       description: this.props.item.description,
//       deleteItem: this.props.deleteItem
//     };
//     this.editView = this.editView.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleToggleView = this.handleToggleView.bind(this);
//     this.handleUpdate = this.handleUpdate.bind(this);
//     this.validateForm = this.validateForm.bind(this);
//   }


//   handleToggleView() {
//     this.setState({ edit: !this.state.edit });
//   }


//   handleChange(e) {
//     e.preventDefault();
//     let key = e.target.name;
//     let obj = {};
//     obj[key] = e.target.value;
//     this.setState(obj);
//   }


//   handleUpdate(e) {
//     e.preventDefault();

//     let updatedItem = {
//       id: this.state.item.id,
//       img_url: this.state.img_url,
//       type: this.state.type,
//       gender: this.state.gender,
//       size: this.state.size,
//       tags: this.state.tags,
//       description: this.state.description
//     };

//     $.ajax({
//       method: 'POST',
//       url: `/api/users/some_username/items/${this.state.item.id}`,
//       data: JSON.stringify(updatedItem),
//       dataType: "text",
//       contentType: "application/json; charset=utf-8",
//       success: (response) => {
//         this.setState({
//           item: {
//             ...this.state.item,
//             img_url: this.state.img_url,
//             type: this.state.type,
//             gender: this.state.gender,
//             size: this.state.size,
//             tags: this.state.tags,
//             description: this.state.description
//           }
//         });
//       },
//     });

//     this.setState({
//       item: Object.assign({}, this.state.item, updatedItem, {tags: this.state.tags.split(' ')})
//     });

//     this.handleToggleView();
//   }


//   validateForm() {
//     return (this.state.img_url && this.state.type && this.state.gender && this.state.size && this.state.tags);
//   }


//   editView() {
//     return (
//       <div className='card card-front'>

//         <div className='card-image'>
//           <figure className='image is-4by3'>
//             <img src={this.props.item.img_url} alt='' />
//           </figure>
//         </div>

//         <div className='control'>
//           <input type='text' className='input is-primary'
//                  placeholder='Image URL' name='img_url'
//                  value={this.state.img_url} onChange={this.handleChange}>
//           </input>

//           <input type='text' className='input is-primary'
//                  placeholder='enter type here' name='type'
//                  value={this.state.type} onChange={this.handleChange}>
//           </input>

//           <input type='text' className='input is-primary'
//                  placeholder='enter gender here' name='gender'
//                  value={this.state.gender} onChange={this.handleChange}>
//           </input>

//           <input type='text' className='input is-primary'
//                  placeholder='enter new size here' name='size'
//                  value={this.state.size} onChange={this.handleChange}>
//           </input>

//           <input type='text' className='input is-primary'
//                  placeholder='enter tags' name='tags'
//                  value={this.state.tags} onChange={this.handleChange}>
//           </input>

//           <input type='text' className='input is-primary'
//                  placeholder='enter description' name='description'
//                  value={this.state.description} onChange={this.handleChange}>
//           </input>
//         </div>


//         <div className="card-footer button-container">
//           <button type='submit' className='button is-primary' disabled={!this.validateForm()} onClick={this.handleUpdate}>
//             Update
//           </button>

//           <button className='button is-warning toggle-item-view' onClick={this.handleToggleView}>
//             Cancel Edit
//           </button>

//           <button className='button is-danger toggle-item-view' onClick={() => this.props.deleteItem(this.state.item.id)}>
//             Delete
//           </button>
//         </div>
//       </div>
//     );
//   }


//   defaultView() {
//     return (
//       <div className="card card-front">
//         <div className='card-image'>
//           <figure className='image is-4by3'>
//             <img src={this.props.item.img_url} alt='' />
//           </figure>
//         </div>

//         <div className='card-content'>
//           <div className='media'>
//             <div className='media-content'>
//               <p className='title is-5'>John Smith</p>
//             </div>
//           </div>
//           <div className='content'>
//             <p>Size: {this.state.item.size}</p>
//             {
//               this.state.item.tags.map((tag, i) => {
//               return <span key={i} className='tag item-tag'>{tag}</span>
//             })}
//             <br />
//             <small>!! item creation date here !!</small>

//           </div>
//         </div>
//         <div className="card-footer button-container">
//           <button className='button is-active toggle-item-view' onClick={this.handleToggleView}>Edit Item</button>
//         </div>
//       </div>

//     );
//   }


//   selectView() {
//     if (this.state.edit) return this.editView();
//     else return this.defaultView();
//   }


//   render() {
//     return this.selectView();
//   }
// };

// export default MyItem;
