import {Link} from "react-router-dom";
import {Component} from "react";

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home </Link>
                <h2></h2>
                <Link to="/shift"> Cryptogram Shift</Link>
            </div>
        )
    }
}

export default Header;