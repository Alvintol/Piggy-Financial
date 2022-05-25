# Piggy-Financial

Piggy Financial is an app that aims to help users track their financial goals. With a primary focus on vacation.

![Login Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/Login.png?raw=true)
![Sign Up Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/SignUpPage.png?raw=true)
![Profile Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/ProfilePageKevin.png?raw=true)
![Savings Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/SavingsPage.png?raw=true)
![Expense Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/ExpensePage.png?raw=true)
![Savings Line Graph](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/LineGraphSaving.png?raw=true)
![Spending Line Graph](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/LineGrapghSpending.png?raw=true)
![Break The Piggy Bank](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/SavingsPigBreak.png?raw=true)
![Budget Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/BudgetPage.png?raw=true)

## Creating the DB

Use the `psql -U vagrant` command to login to the PostgreSQL server with the username `vagrant` and the password `123`. This command `MUST` be run in a vagrant terminal, we are using the PostgreSQL installation provided in a vagrant environment.

`cd` into `Piggy-Financial` folder. 
Create a database with the command `CREATE DATABASE piggy;`.\
Run command `/i express-back-end/src/db/schema/create.sql` 

Copy the `.env.example` file to `.env` and fill in the necessary PostgreSQL configuration. The node-postgres library uses these environment variables by default.
This should look like this below:

```
PGHOST=localhost
PGDATABASE=piggy
PGPORT=5432
DB_USER=vagrant
DB_PASS=123
```

Run the command `\i express-back-end/src/db/seeds/allinone.sql` to populate the seed data to the tables.

## Running the project

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.

Enter app using only the following credentials:

```
User: 
  `alvin@hotmail.com`
or 
  `ricky@hotmail.com`
or 
  `kevin@hotmail.com`

Password: `1`
```

## Dependencies

 - `Axios`: Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6
 - `Bcryptjs`: Password encryption in Node.js 
 - `Chart.js`: JavaScript library for data visualization, which supports eight chart types
 - `Chartjs`-Adapter-date-fns: Overrides the default date-adapter provided in Chart.js
 - `Classnames`: A simple utility for conditionally joining classNames together
 - `Date-fns`: Modern JavaScript date utility library
 - `Mdb-ui-kit`: Bootstrap 5 UI KIT
 - `Node-sass`: Sass is a stylesheet language that’s compiled to CSS
 - `React`: JavaScript library for building user interfaces
 - `React-Chartjs`-2: React components for Chart.js
 - `React-Circular`-Progressbar: A circular progress indicator component
 - `React-Cookie`: Universal cookies for React
 - `React-Scripts`: Configuration and scripts for Create React App

 ## Current bugs

 - Currency must be picked prior to any other input when entering a new expense if different from previous 
 - No goal/empty view can be be rendered
 - New users can be created, but due to above bug, user cannot enter app