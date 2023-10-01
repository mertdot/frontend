import React, { Component } from 'react';
import axios from 'axios';

export function withApiProgress(WrappedComponent, apiPath){
return class extends Component {
    state = {
        pendingApiCall: false,

    };

    componentDidMount(){
        this.requestInterceptor = axios.interceptors.request.use((request) => {
          this.updateApiCallFor (request.url, true)
            return request;
        })

        this.responseInterceptor = axios.interceptors.response.use((response) => {
            // if(response.config.url == this.props.path){
            //     this.setState({pendingApiCall: false});
            // }
            this.updateApiCallFor (response.config.url, false)
            return response;
        }, (error) => {
            // if(error.config.url == this.props.path){
            //     this.setState({pendingApiCall: false});
            // }
            this.updateApiCallFor  (error.config.url, true)
            this.setState({pendingApiCall: false});
            throw error;
        })
    }

    componentWillUnmount(){
        axios.interceptors.request.eject(this.requestInterceptor);
        axios.interceptors.response.eject(this.responseInterceptor);
    }

    updateApiCallFor = (url, inProgress) =>{
        if(url === apiPath){
            this.setState({pendingApiCall: inProgress});
        }
    }

    render() {
        const pendingApiCall = this.state.pendingApiCall || this.props.pendingApiCall
        return <WrappedComponent {... this.props} pendingApiCall={pendingApiCall}  ></WrappedComponent>
    }
}
}
