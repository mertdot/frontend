import React from 'react';
import { withRouter } from 'react-router-dom' //çağrıldığı componentin içerisindeki propertilere erişebiliyor.
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    let message = "login yapmamış kullanıcının sayfası";
    if(pathUsername === props.loggedInUsername){
        message = "login yapmış kullanıcının sayfası";
    }
    return (
        <div>
            {message}
        </div>
    );
};

const mapStateToProps = (store) => {
    return{
        loggedInUsername: store.username
    };
  };



export default connect(mapStateToProps)(withRouter(ProfileCard));