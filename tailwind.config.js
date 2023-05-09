/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                purple: '#7C54D5',
                something: '#F2F5F8',
                gray: '#F2F2F2',
                as: '#C29CC2',
                someyellow: '#FCC662'
            },
            fontFamily: {
                poppins: ['Poppins'],
            },
        },
    },
    plugins: [],
};
