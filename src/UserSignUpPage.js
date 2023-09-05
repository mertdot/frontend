import React from "react";
import axios from "axios";

class UserSignUpPage extends React.Component{

    state = {
        username: null,
        agreedClicked: false,
        displayName: null,
        password: null,
        passwordRepeat: null
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

    onClickSignup = event => {
        event.preventDefault(); //browser'ın bizim yerimize bir yere gönderemeye çalışmasını engelliyoruz.
        
        const { username, displayName, password} = this.state;

        const body = { //js key ve value aynı referans isme sahipse o zaman sadece key yazmak yeterli.
            username,
            displayName,
            password: password
        }
        axios.post('/api/1.0/users', body)
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
        return(
            <form>
            <h1>Sign Up</h1>
            <div>
            <label>Username</label>
            <input name="username" onChange={this.onChange}></input>
            </div>
            <div>
            <label>Display Name</label>
            <input name="displayName" onChange={this.onChange}></input>
            </div>
            <div>
            <label>Password</label>
            <input name="password" type="password" onChange={this.onChange}></input>
            </div>
            <div>
            <label>Password Repeat</label>
            <input name="passwordRepeat" type="password" onChange={this.onChange}></input>
            </div>
            <input type="checkbox" onChange={this.onChangeAgree}></input> Agreed
            <button onClick={this.onClickSignup} disabled={!this.state.agreedClicked}>Sign Up</button>
            </form>
        );
    }
}

export default UserSignUpPage