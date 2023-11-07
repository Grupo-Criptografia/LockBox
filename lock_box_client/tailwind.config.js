/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'poppy': '#F8721B',
                'charcoal': '#373839',
                'ivory': '#F2EBE6',
                'verde_prymary': '#56704C'
            }
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require("daisyui")
    ],
}

