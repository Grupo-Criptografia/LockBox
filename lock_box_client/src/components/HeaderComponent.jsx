import {Link} from "react-router-dom";
import {Component} from "react";

class Header extends Component {
    render() {
        return (
            <header className="text-charcoal body-font bg-verde_prymary">
                <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                    <Link to="/" className="flex title-font font-medium items-center text-charcoal mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                             strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                             className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Lock Box</span>
                    </Link>
                    <nav
                        className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to="/" className="mr-5 hover:text-ivory">Home</Link>
                        <Link to="/aboutus" className="mr-5 hover:text-ivory">About</Link>
                        <Link to="/contactus" className="mr-5 hover:text-ivory">Contact</Link>
                    </nav>
                </div>
            </header>
        )
    }
}

export default Header;