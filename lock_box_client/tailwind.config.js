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
                'ivory': '#F2EBE6'
            }
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require("daisyui")
    ],
}

