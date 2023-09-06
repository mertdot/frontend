import React from "react";
import { signup } from '../api/apiCalls'

class UserSignUpPage extends React.Component{

    state = {
        username: null,
        agreedClicked: false,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false
    };

    onChange = event => {
        const { name, value } = event.target; //obje parçalama (object destruction)

        this.setState({
            [name]: value
        })
    }

    onChangeAgree = event => {
        this.setState({
            agreedClicked: event.target.checked
        });
    };

    onClickSignup = async event => {
        event.preventDefault(); //browser'ın bizim yerimize bir yere gönderemeye çalışmasını engelliyoruz.
        
        const { username, displayName, password} = this.state;

        const body = { //js key ve value aynı referans isme sahipse o zaman sadece key yazmak yeterli.
            username,
            displayName,
            password: password
        }

        this.setState({ pendingApiCall: true });

        try{
        const response = await signup(body);
        } catch(error){

        }
        this.setState({ pendingApiCall: false });
    //    signup(body)
    //         .then(response => {
    //             this.setState({ pendingApiCall: false });
    //         })
    //         .catch(error =>{
    //         this.setState({ pendingApiCall: false });
    //     });
    }

/*
    onChangeUsername = event => {
    this.setState({
        username: event.target.value
    });
    };

    onChangeDisplayName = event => {
        this.setState({
            displayName: event.target.value
        });
        };
    onChangePassword = event => {
        this.setState({
            password: event.target.value
        });
        };       

    onChangePasswordRepeat = event => {
        this.setState({
            passwordRepeat: event.target.value
        });
        };
*/



    render(){
        const { pendingApiCall } = this.state;

        return(
            <div className="container">
            <form>
            <h1 className="text-center">Sign Up</h1>
            <div class="form-group">
            <label>Username</label>
            <input class="form-control" name="username" onChange={this.onChange} ></input>
            </div>
            <div className="form-group">
            <label>Display Name</label>
            <input className="form-control" name="displayName" onChange={this.onChange}></input>
            </div>
            <div className="form-group">
            <label>Password</label>
            <input className="form-control" name="password" type="password" onChange={this.onChange}></input>
            </div>
            <div className="form-group">
            <label>Password Repeat</label>
            <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange}></input>
            </div>
            <input type="checkbox" onChange={this.onChangeAgree}></input> Agreed
            <div className="text-center">
            <button className="btn btn-primary" onClick={this.onClickSignup} disabled={pendingApiCall}>
                {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}Sign Up</button>
            </div>
            </form>      
            </div>
        );
    }
}

export default UserSignUpPage