import React, { Component } from 'react';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
//import { Authentication } from '../shared/AuthenticationContext';
import { connect } from 'react-redux';
import { loginHandler, loginSuccess } from '../redux/authActions';
 
class LoginPage extends Component {
//    static contextType = Authentication;
    state = {
        username: null,
        password: null,
        state: null,
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        })
    }

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = {
            username,
            password
        };

        const { history, dispatch } = this.props;
        const { push } = this.props.history;
        this.setState({
            error: null
        })
        try{
            await dispatch(loginHandler(creds))
            push('/');
        } catch(apiError){
            console.log(apiError)
            console.log("apierror: ", apiError);
             this.setState({
                 error: apiError.response.data.message
             })
        }
    }

    render() {
        const { pendingApiCall} = this.props;

        const { username, password, error} = this.state;

        const buttonEnabled = username && password;

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>Login</h1>
                    <Input label="Username" name="username" onChange = {this.onChange} ></Input>
                    <Input label="Password" name="password" type="password" onChange = {this.onChange} ></Input>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className='text-center'>
                    <ButtonWithProgress 
                    onClick={this.onClickLogin}
                    disabled={!buttonEnabled || pendingApiCall}
                    pendingApiCall ={pendingApiCall}
                    text='Login'
                    >Login</ButtonWithProgress>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect()(LoginPage);
