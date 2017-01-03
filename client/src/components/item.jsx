// import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import FlipCard from 'react-flipcard';
// import DeleteButton from './item_components/DeleteButton.jsx'

// class Item extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isFlipped: false
//     };
//     this.showBack = this.showBack.bind(this);
//     this.showFront = this.showFront.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//   }

//   showBack() {
//     this.setState({
//       isFlipped: true
//     });
//   }

//   showFront() {
//     this.setState({
//       isFlipped: false
//     });
//   }

//   handleKeyDown(e) {
//     if (this.state.isFlipped && e.keyCode === 27) {
//       this.showFront();
//     }
//   }


//   render() {
//     return (

//       <FlipCard
//         disabled={true}
//         flipped={this.state.isFlipped}
//         onFlip={this.handleOnFlip}
//         onKeyDown={this.handleKeyDown}
//       >

//         <div className="card card-front">
//           <div className="card-image">

//             <DeleteButton item={this.props.item} deleteItem={this.props.deleteItem} />

//             <figure className="image is-4by3">
//               <img src="../../public/images/default_img.jpg" alt="" />
//             </figure>
//           </div>
//           <div className="card-content">
//             <div className="media">
//               <div className="media-content">
//                 <p className="title is-5">John Smith</p>
//               </div>
//             </div>
//             <div className="content">
//               <p>Size: {this.props.item.size}</p>
//               { this.props.item.tags.map((tag, i) => {
//                 return <span key={i} className="tag item-tag">{tag}</span>
//               })}
//               <br />
//               <small>!!{this.props.item.owner.created_at.slice(0, 10)}!!</small>

//             </div>
//           </div>
//           <div className="card-footer button-container">
//             <button className="card-footer-item" type="button" onClick={this.showBack}>Show back</button>
//           </div>
//         </div>



//         <div className="card card-back">
//           <div className="card-back-content">
//             <div className="item-owner-contact-info">email: {this.props.item.owner.email} | phone: {this.props.item.owner.phone_number} </div>
//             <div className="card-back-owner-images">
//             { this.props.item.owner.sellersInterestInMyProduct.map((item, index) => {
//               return (
//                 <div key={index} className="matched-item-from-users-closet">
//                   <figure className="image is-64x64">
//                     <img src="../../public/images/curr_user_item_img.jpg" alt="Image" />
//                   </figure>
//                   <span>{Math.round(item[Object.keys(item)[0]] * 100)/100} </span>
//                 </div>
//               );
//             })}
//             </div>
//           </div>
//           <div className="card-footer button-container">
//             <button className="card-footer-item" type="button" ref="backButton" onClick={this.showFront}>Show front</button>
//           </div>
//         </div>

//       </FlipCard>
//     );
//   }

// };
// export default Item;
