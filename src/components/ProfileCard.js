import React from 'react';
import { withRouter } from 'react-router-dom' //çağrıldığı componentin içerisindeki propertilere erişebiliyor.
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    let message = "we cannot edit";
    if(pathUsername === props.loggedInUsername){
        message = "we can edit";
    }
    return (
        <div>
            {message}
        </div>
    );
};


// class ProfileCardContextWrapper extends React.Component {
//     static contextType = Authentication;
//     render() {
//         return (
//             <div>
//                 <ProfileCard {...this.props} username={this.context.state.username}></ProfileCard>
//             </div>
//         );
//     }
// }

const mapStateToProps = (store) => {
    return{
        loggedInUsername: store.username
    };
  };



export default connect(mapStateToProps)(withRouter(ProfileCard));