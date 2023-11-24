import {Link, Outlet} from "react-router-dom";

export function HomeDigSignature() {

    {/* Retorna la vista */
    }
    return (
        <section className="text-charcoal w-4/5 bg-white body-font">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div className="text-center lg:w-2/3 w-full">
                    <div className="flex justify-items-center py-10 font-semibold text-black divide-x-1">
                        <Link to="signature"
                              className="flex justify-center items-center rounded-l-md bg-color3 w-1/2 h-16">
                            <span className="btm-nav-label">Digital Signature</span>
                        </Link>
                        <Link className="bg-color4 w-1/2 h-16 rounded-r-md flex justify-center items-center"
                              to="verification">
                            <span className="btm-nav-label">Verify Digital Signature</span>
                        </Link></div>
                    <div>
                        <h1 className="title-font sm:text-4xl text-3xl mb-6 font-medium text-gray-900">Digital
                            Signature</h1>
                        <p className="mb-4 leading-relaxed">In our increasingly digital world, the need for secure and
                            verifiable signatures on electronic documents and communications has become paramount. This
                            is where digital signatures come into play, serving as a cornerstone of modern cybersecurity
                            and digital verification processes.</p>
                        <p className="mb-1 leading-relaxed">
                            A digital signature, at its core, is a cryptographic mechanism that is used to verify the
                            authenticity and integrity of a digital message or document.
                        </p>
                        <p className="mb-1 leading-relaxed">
                            Digital signatures utilize a combination of cryptographic algorithms, typically involving a
                            pair of keys: a private key for signing and a public key for verification.
                        </p>
                        <p className="mb-1 leading-relaxed">When a document is signed digitally, the signature is
                            created using the signer's private key. This signature is then attached to the document or
                            message.</p>
                        <p className="mb-1 leading-relaxed">To verify the signature, the recipient uses the signer's
                            public key. If the signature is valid, it confirms that the document or message has not been
                            tampered with since it was signed and that the signer's identity is authentic.</p>
                        <p className="mb-1 leading-relaxed"></p>
                    </div>
                </div>
                <Outlet/>
            </div>
        </section>
    )
}