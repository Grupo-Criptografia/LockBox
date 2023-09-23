import {Component} from "react";
import {Link} from "react-router-dom";

class Menu extends Component {
    render() {
        return (
            <aside
                className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-charcoal border-r rtl:border-r-0 rtl:border-l">
                        <span
                            className="flex title-font text-base font-medium items-center uppercase text-ivory mb-4 md:mb-0">Cryptograms</span>
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 space-y-6 ">
                        <div className="space-y-3">
                            <ul className="menu">
                                <li>

                                    {/* Menu para Shift */}
                                    <details open>
                                        <summary>
                                            <label className="px-3 text-base text-ivory uppercase">Shift</label>
                                        </summary>
                                        <ul>
                                            <li>
                                                <Link
                                                    className="flex items-center px-3 py-2 text-ivory transition-colors duration-300 transform rounded-lg hover:bg-ivory  hover:text-charcoal"
                                                    to="/shift/encrypt">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                         fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="text-sm font-medium">Encrypt</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="flex items-center px-3 py-2 text-ivory transition-colors duration-300 transform rounded-lg hover:bg-ivory  hover:text-charcoal"
                                                    to="/shift/decrypt">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                         fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="text-sm font-medium">Decrypt</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="flex items-center px-3 py-2 text-ivory transition-colors duration-300 transform rounded-lg hover:bg-ivory  hover:text-charcoal"
                                                    to="/shift/attack">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                         fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M10.339 2.237a.532.532 0 00-.678 0 11.947 11.947 0 01-7.078 2.75.5.5 0 00-.479.425A12.11 12.11 0 002 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 00.332 0C14.74 16.564 18 12.163 18 7.001c0-.54-.035-1.07-.104-1.59a.5.5 0 00-.48-.425 11.947 11.947 0 01-7.077-2.75zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="text-sm font-medium">Attack</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>

                                    {/* Menu para Substitution*/}
                                    <details open>
                                        <summary>
                                            <label className="px-3 text-base text-ivory uppercase">Substitution</label>
                                        </summary>
                                        <ul>
                                            <li>
                                                <Link
                                                    className="flex items-center px-3 py-2 text-ivory transition-colors duration-300 transform rounded-lg hover:bg-ivory  hover:text-charcoal"
                                                    to="/subs/encrypt">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                         fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="text-sm font-medium">Encrypt</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="flex items-center px-3 py-2 text-ivory transition-colors duration-300 transform rounded-lg hover:bg-ivory  hover:text-charcoal"
                                                    to="/subs/decrypt">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                         fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="text-sm font-medium">Decrypt</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="flex items-center px-3 py-2 text-ivory transition-colors duration-300 transform rounded-lg hover:bg-ivory  hover:text-charcoal"
                                                    to="/subs/attack">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                         fill="currentColor" className="w-5 h-5">
                                                        <path fillRule="evenodd"
                                                              d="M10.339 2.237a.532.532 0 00-.678 0 11.947 11.947 0 01-7.078 2.75.5.5 0 00-.479.425A12.11 12.11 0 002 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 00.332 0C14.74 16.564 18 12.163 18 7.001c0-.54-.035-1.07-.104-1.59a.5.5 0 00-.48-.425 11.947 11.947 0 01-7.077-2.75zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    <span className="text-sm font-medium">Attack</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>
        )
    }
}

export default Menu