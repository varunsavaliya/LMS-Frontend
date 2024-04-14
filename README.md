
# LMS Frontend

This is the frontend repository for the Learning Management System (LMS) project.

[Visit live site here](https://lms-frontend-eight-gules.vercel.app/)

## Project Description

The LMS Frontend is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides the user interface for managing courses, users, course lectures, and other functionalities related to the learning management system.

## Features

- User authentication and authorization
- Course management (create, edit, delete)
- User management (create, edit, delete)
- Course Lecture (created, edit, delete)
- Integration with Cloudinary for file storage
- Integration with Razorpay for payment processing

### Note (For Razorpay tesing)

There will be no real payments, user just have to press show QR button to make the payment as Razorpay is integrated with test invironments
## Related

For the backend repository of the LMS project, please refer to the corresponding backend repository named "LMS Backend."

[LMS Backend](https://github.com/varunsavaliya/LMS-Backend.git)


## Installation

Install LMS Frontend with npm in your local system

- Clone the project

```
    git clone https://github.com/varunsavaliya/LMS-Frontend.git

    cd LMS-Frontend
```

- Install node packages

```
    npm install
```

- Create environment file

    Create a `.env` file and provide necessary environment variables (necessary variables are provided in `.env.example`).

- Run project

```
    npm run dev
```
## Usage

Once the development server is running, you can access the LMS frontend in your web browser. You can create an account, login, and start managing or participating in courses and lecture.
## Tech Stack

- React.js
- Redux Toolkit
- Axios
- Cloudinary
- Razorpay