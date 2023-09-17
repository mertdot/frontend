import React, { Component } from 'react';
import axios from 'axios';

export function withApiProgress(WrappedComponent, apiPath){
return class extends Component {
    state = {
        pendingApiCall: false,

    };

    componentDidMount(){
        axios.interceptors.request.use((request) => {
          //  if(request.url == this.props.path){
          //      this.setState({pendingApiCall: true});
          //  }
          this.updateApiCallFor (request.url, true)
            return request;
        })

        axios.interceptors.response.use((response) => {
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

    updateApiCallFor = (url, inProgress) =>{
        if(url === apiPath){
            this.setState({pendingApiCall: inProgress});
        }
    }

    render() {
        const { pendingApiCall } = this.state;
        /* return (
            <div>
                {React.cloneElement(this.props.children, {pendingApiCall})}
            </div>
        );*/
        return <WrappedComponent pendingApiCall={pendingApiCall}></WrappedComponent>
    }
}
}
