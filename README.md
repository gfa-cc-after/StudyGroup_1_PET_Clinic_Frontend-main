# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Color scheme of landing: https://coolors.co/1d5276-eeeeee-188265-272727-ce2d4f


# Running the React Vite App for the First Time

To get started with the React Vite app, follow these steps:
    
    (Ensure you have Node.js installed. You can verify this by running node -v in your terminal. You should have a package manager installed. This project uses npm by default)

1.  Clone the Repository

2.  Navigate to the Project Directory   

3.  Install the required dependencies using npm:

    ```npm install```

4.  Start the development server with:

    ```npm run dev```

    Or, to run the containerized version:
    
    ```docker compose up```
    
5.  To run tests, use::

    ```npm test```



### Instructions for setting environment variables in .env file:

1.  Copy the .env.sample file to a new file named .env like below:

    ```cp .env.sample .env```

2.  Fill in the values for each environment variable in the .env file.

***The .env file should not be committed to the repository as it's listed in the .gitignore.***