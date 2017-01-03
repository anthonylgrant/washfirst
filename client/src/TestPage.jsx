// import React, {Component} from 'react';

// import Navbar from './components/Navbar.jsx';
// import MyItem from './components/MyItem.jsx';

// class TestPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userPreferenceTags: [],
//       myItems: [],
//     };

//     this.deleteItem = this.deleteItem.bind(this);
//   }

//   componentDidMount() {
//     $.ajax({
//       method: 'GET',
//       url: '/api/',
//       dataType: 'JSON',
//       success: (response) => {
//         let tops = response.currUserInfo.myItems.tops;
//         let bottoms = response.currUserInfo.myItems.bottoms;
//         let shoes = response.currUserInfo.myItems.shoes;
//         this.setState({
//           userPreferenceTags: response.currUserInfo.preferences,
//           myItems: tops.concat(bottoms).concat(shoes)
//         });
//       }
//     });
//   }


//   deleteItem(itemId) {
//     $.ajax({
//       method: 'DELETE',
//       url: `/api/items/${itemId}`,
//       success: ((response) => {
//         let tops = response.currUserInfo.myItems.tops;
//         let bottoms = response.currUserInfo.myItems.bottoms;
//         let shoes = response.currUserInfo.myItems.shoes;
//         this.setState({
//           userPreferenceTags: response.currUserInfo.preferences,
//           myItems: tops.concat(bottoms).concat(shoes)
//         });
//       })
//     });
//   }


//   render() {
//     return (
//       <div>
//         <Navbar loggedIn={true}/>
//           <div className="main-container">
//             <div className="items-container">
//               {this.state.myItems.map((item) => {
//                 return (
//                   <div key={item.id} className="main-container-item">
//                     <MyItem item={item} deleteItem={this.deleteItem}/>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//       </div>
//     );
//   }
// }

// export default TestPage;
