# plismun

This project is the new site for plismun.com

## Installation

Prerequisites: - [Node.js](https://nodejs.org/en/)

1. Clone with git:
   `git clone https://github.com/oof2win2/plismun && cd plismun`
2. Install dependencies
   `npm install -D`
3. Fill up your `.env` file according to `.env.example`
4. Generate & push SQL to the database
   `npx prisma db push`
5. Seed the database
   `npm run prisma:seed`
6. Run the development server
   `npm run dev`


## TODO
-	Improve all status codes and error handling
-	Implement CSRF protection