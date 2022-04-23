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

Using base SCSS from [CloudCannon/vonge-jekyll-bookshop-template](https://github.com/CloudCannon/vonge-jekyll-bookshop-template)

## TODO

- [ ] reduce amount of custom SCSS to minimum
- [ ] Completely remove mui
- [ ] Create modification of own account for users (phone number, email, etc.)
- [ ] Implement signup emails
- [ ] Fix issues with floating labels
- Improve all status codes and error handling
- Implement CSRF protection
- Send an email to users to verify their accounts before the accounts are actually created to prevent spam
- Email verification of applications
- Check that a user applying to delegate is not applied to chair
