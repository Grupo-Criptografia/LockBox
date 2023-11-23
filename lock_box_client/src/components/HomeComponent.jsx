import {Component} from "react";

class Home extends Component {
    render() {
        return (
            <div className="md:flex flex-col h-auto w-4/5 bg-white">
                <div className="md:flex flex-row h-20 w-auto ">
                    <div className="h-auto w-1/3 bg-color2 border-black border-3"></div>
                    <div className="h-auto w-1/3 bg-color1 border-black border-3"></div>
                    <div className="h-auto w-1/3 bg-color4 border-black border-3"></div>
                </div>

                <div className="px-6 py-10 w-auto bg-white ">
                    <h2 className="text-5xl text-center font-bold text-black">LOCK  BOX</h2>
                    <h3 className="text-2xl text-center font-semibold text-black"> 
                        Start your encryption adventure right now and go beyond theory!
                    </h3>
                    <div className="px-7 py-6 bg-white text-justify">
                    <p className="text-charcoal text-lg"> Unlock the power
                                of cryptography with interactive tools designed for everyone. Whether you are a
                                enthusiast, an educator or simply curious, LockBox invites you to immerse yourself
                                in the practice of encryption and decryption. With an intuitive interface and without the
                                needing prior knowledge, you will be able to: </p>

                    <ul className="px-10">
                        <li>
                            <p className="mt-4 text-lg text-black whitespace-pre-line lg:text-base flex">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor" className="w-5 h-5 mr-1">
                                <path fillRule="evenodd"
                                                d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.59 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 01-.332 0C5.26 16.564 2 12.163 2 7c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.75zm4.196 5.954a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                clipRule="evenodd"/>
                                </svg>
                                <strong className="font-bold mr-2 text-lg">Encrypt:</strong> <p className="text-charcoal text-lg">Transform your messages into
                                        indecipherable codes.</p>
                            </p>
                        </li>
                        <li>
                            <p className="mt-4 text-lg text-black whitespace-pre-line lg:text-base flex">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor" className="w-5 h-5 mr-1">
                                <path fillRule="evenodd"
                                                d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                                                clipRule="evenodd"/>
                                </svg>
                                <strong className="font-bold mr-2 text-lg">Decrypt:</strong><p className="text-charcoal text-lg">Reveal hidden secrets
                                        behind the codes.</p> 
                            </p>
                        </li>
                        <li>
                            <p className="mt-4 text-lg text-black whitespace-pre-line lg:text-base flex">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor" className="w-5 h-5 mr-1">
                                <path fillRule="evenodd"
                                                d="M10.339 2.237a.532.532 0 00-.678 0 11.947 11.947 0 01-7.078 2.75.5.5 0 00-.479.425A12.11 12.11 0 002 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 00.332 0C14.74 16.564 18 12.163 18 7.001c0-.54-.035-1.07-.104-1.59a.5.5 0 00-.48-.425 11.947 11.947 0 01-7.077-2.75zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                                clipRule="evenodd"/>
                                </svg>
                                <strong className="font-bold mr-2 text-lg">Attack: </strong><p class="text-charcoal text-lg">
                                            Test the strength of different cryptographic systems.</p>
                            </p>
                        </li>
                    </ul>
                        <p className="mt-4 text-lg text-charcoal whitespace-pre-line">
                                No hassle, no hidden processes, just you and crypto in action.
                        </p>
                    </div>
                </div>
                <div className="md:flex flex-row h-20 w-auto flex-1">
                    <div className="h-auto w-1/3 bg-color2 border-black border-3"></div>
                    <div className="h-auto w-1/3 bg-color1 border-black border-3"></div>
                    <div className="h-auto w-1/3 bg-color4 border-black border-3"></div>
                </div>           
            </div>
        )
    }
}

export default Home;