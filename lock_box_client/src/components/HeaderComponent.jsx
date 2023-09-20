import {Link} from "react-router-dom";
import {Component} from "react";

class Header extends Component {
    render() {
        return (
            <div className="">
                <header className="text-charcoal body-font bg-poppy">
                    <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
                        <Link to="/" className="flex title-font font-medium items-center text-charcoal mb-4 md:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 className="w-10 h-10 text-white p-2 bg-green-500 rounded-full" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                            <span className="ml-3 text-xl">Lock Box</span>
                        </Link>
                        <nav
                            className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                            <a className="mr-5 hover:text-ivory"><Link to="/">Home</Link></a>
                            <a className="mr-5 hover:text-ivory">About</a>
                            <a className="mr-5 hover:text-ivory">Contact</a>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;