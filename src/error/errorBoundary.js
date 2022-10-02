import {Component, setState} from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }
    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    componentDidCatch(error, errorInfor) {
        //logErrorToMyService(error, errorInfor);
    }

    render(){
        if(this.state.hasError){
            return <h2>Something went wrong</h2>
        }
        return this.props.children
    }

}

export default ErrorBoundary;