import React from 'react';
import { withRouter } from 'react-router-dom' //çağrıldığı componentin içerisindeki propertilere erişebiliyor.

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    return (
        <div>
            {pathUsername}
        </div>
    );
};

export default withRouter(ProfileCard);