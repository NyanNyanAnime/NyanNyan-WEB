import React from "react";
import nfimg from "./Image/notfound.png"

function NotFound() {
    return (
        <div className="bg-blue-100">
            <div className="lg:py-40 mx-auto max-w-screen-md">
                <div className="p-10 max-h-96 flex items-center justify-center h-screen">
                    <img src={nfimg} alt="Not found" className="h-40 w-40 mr-20" />
                    <div>
                        <h1 className="text-9xl font-bold mb-4">404</h1>
                        <p className="text-lg text-gray-700 mb-8">Sorry, the page you're looking for doesn't exist.</p>
                        <a href="/#home" className="mt-4 font-bold hover:underline">Return?</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;