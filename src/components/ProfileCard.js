import React from 'react';
import { withRouter } from 'react-router-dom' //çağrıldığı componentin içerisindeki propertilere erişebiliyor.
import { Authentication } from '../shared/AuthenticationContext';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.username;
    let message = "we cannot edit";
    if(pathUsername === loggedInUsername){
        message = "we can edit";
    }
    return (
        <div>
            {message}
        </div>
    );
};


class ProfileCardContextWrapper extends React.Component {
    static contextType = Authentication;
    render() {
        return (
            <div>
                <ProfileCard {...this.props} username={this.context.state.username}></ProfileCard>
            </div>
        );
    }
}


export default withRouter(ProfileCardContextWrapper);