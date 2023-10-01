import React from "react";
import { signup } from '../api/apiCalls'
import Input from '../components/Input'
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/withApiProgress";
import { connect } from "react-redux";
import { signupHandler } from "../redux/authActions";


class UserSignUpPage extends React.Component{

    state = {
        username: null,
        agreedClicked: false,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        const { name, value } = event.target; //obje parçalama (object destruction)
        const errors = {...this.state.errors}; //spread operator
        errors[name] = undefined;
        if (name === 'password' || name === 'passwordRepeat'){
            if( name === 'password' && value !== this.state.passwordRepeat ){ //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                errors.passwordRepeat = 'Password mismatch';
            } else if ( name === 'passwordRepeat' && value !== this.state.password){
                errors.passwordRepeat = 'Password mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({  //hata mesajını state'e attık!!!
            [name]: value,
            errors
        });
    }

    onChangeAgree = event => {
        this.setState({
            agreedClicked: event.target.checked
        });
    };

    onClickSignup = async event => {
        event.preventDefault(); //browser'ın bizim yerimize bir yere gönderemeye çalışmasını engelliyoruz.
        
        const { history, dispatch } = this.props;
        const { push } = history;
        const { username, displayName, password} = this.state;

        const body = { //js key ve value aynı referans isme sahipse o zaman sadece key yazmak yeterli.
            username,
            displayName,
            password
        }

        try{
            await dispatch(signupHandler(body));
            push('/');
        } catch(error){
            if(error.response.data.validationErrors){
                this.setState({errors: error.response.data.validationErrors});
            }
        }
    };




    render(){
        const { errors } = this.state; //object destruction
        const { username, displayName, password, passwordRepeat } = errors; //object destruction
        const { pendingApiCall } = this.props;

        return(
            <div className="container">
            <form>
            <h1 className="text-center">Sign Up</h1>
            <Input name= "username" label="Username" error={username} onChange={this.onChange}></Input>
            <Input name= "displayName" label="Display Name" error={displayName} onChange={this.onChange}></Input>
            <Input name= "password" label="Password" error={password} onChange={this.onChange} type="password"></Input>
            <Input name= "passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange} type="password"></Input>
            <div className="text-center">
            <ButtonWithProgress className="btn btn-primary" 
            onClick={this.onClickSignup}
            disabled={pendingApiCall || passwordRepeat !== undefined}
            pendingApiCall={pendingApiCall}
            text='Sign Up'>
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            </ButtonWithProgress>
            </div>
            </form>      
            </div>
        );
    }
}

const UserSignUpPageWithApiProgressForSignupRequest = withApiProgress(UserSignUpPage, '/api/1.0/users');

const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignUpPageWithApiProgressForSignupRequest, '/api/1.0/auth');



export default connect()(UserSignupPageWithApiProgressForAuthRequest)