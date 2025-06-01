# Fitness Tracker Platform

## Overview

This project is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to revolutionize the fitness industry. The platform provides individuals with innovative solutions to lead healthier, more active lifestyles by combining cutting-edge technology with a passion for fitness. It empowers users to track their progress, set goals, connect with trainers, and engage in a vibrant community forum.

## Key Features

*   **User Authentication and Authorization:** Secure registration and login system with role-based access control (Admin, Trainer, Member) using JWT.
*   **Homepage:**
    *   Dynamic banner with calls to action.
    *   Featured website features.
    *   Organization information.
    *   Display of featured classes based on popularity.
    *   Testimonials/reviews carousel.
    *   Latest community/forum posts.
    *   Newsletter subscription.
    *   Team section showcasing trainers.
*   **Trainer Management:**
    *   Public-facing page displaying all trainers with profiles and available slots.
    *   Trainer details page with comprehensive information and booking options.
    *   "Become a Trainer" application process.
*   **Class Management:**
    *   Comprehensive list of all available classes with descriptions.
    *   Pagination for easy navigation.
    *   Association of trainers with specific classes.
*   **Community Forum:**
    *   Forum page with pagination to display posts.
    *   Voting system for posts (upvotes/downvotes).
    *   Admin/Trainer badges for enhanced community interaction.
*   **Dashboard:**
    *   Role-based dashboard access for Admin, Trainer, and Member.
    *   Admin: Manage users, trainers, classes, newsletter subscribers, and financial overview.
    *   Trainer: Manage available slots, view bookings, and add forum posts.
    *   Member: View activity log, manage profile, view booked trainers, and provide reviews.
*   **Booking and Payment:**
    *   Trainer booking page with available slots.
    *   Stripe-based payment system.
    *   Secure storage of payment information.
*   **Challenging Tasks:**
    *   Search functionality on the "All Classes" page.
    *   Community/Forums page enhancements.
    *   Admin rejection of trainer applications with feedback.
    *   JWT-based private routes authorization (401/403).

## Technologies Used

*   **Frontend:**
    *   React.js
    *   Tailwind CSS and Component Libraries (React-Flowbite, Mamba UI, Headless UI, Material Tailwind, Wind UI)
    *   React Router DOM for navigation
    *   Axios for API requests
    *   React Helmet for dynamic title changes
    *   SweetAlert2 for notifications
    *   React Select
    *   TanStack Query for data fetching

*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB with Mongoose (or Native MongoDB Driver)
    *   JSON Web Tokens (JWT) for authentication
    *   bcrypt for password hashing
    *   cors for Cross-Origin Resource Sharing
    *   dotenv for environment variable management
    *   stripe for payment processing

## Live Site URL

[Visit to the live site](https://fitness-tracker-project-7cc0f.web.app )

## Admin Credentials

*   **Email:** www.sakia890@gmail.com
*   **Password:** Rimon123!@#

## Installation

1.  **Clone the repositories:**

    ```bash
    git clone https://github.com/Kamrul-Hasan-Rimon/Assignment-12-client
    git clone https://github.com/Kamrul-Hasan-Rimon/Assignment-12-server
    ```

2.  **Client-Side Setup:**

    ```bash
    cd client
    npm install
    ```

    *   Create a `.env.local` file and add your Firebase configuration keys (API key, auth domain, etc.). Make sure to prefix them with `REACT_APP_`.

 
    ```

    *   Start the development server:

    ```bash
    npm start
    ```

3.  **Server-Side Setup:**

    ```bash
    cd server
    npm install
    ```

    *   Create a `.env` file and add your MongoDB connection string and JWT secret key:

    ```
    MONGODB_URI=mongodb+srv://<db_user>:<db_pass>@cluster0.vtrz9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=6e8b5f1c7a2d4e9b3c0a1f8d2e7c6b5a4f3e2d1c0b9a8e7d6c5b4a3f2e1d0c9b
    STRIPE_SECRET_KEY=sk_test_51Quvpo5dC14J6R9rT2SnCp90asnMdCq4vuXI3KdtV5QKD1MY9ZWnadgo7PKiJLLq4CxVPmPQ9ltLYSow44vhOfBi00UMPsqFHa
    ```

    *   Start the server:

    ```bash
    npm start
    ```

## API Endpoints Documentation

_(Provide a table or list of your key API endpoints, their methods, descriptions, and request/response examples. This is very helpful for developers.)_

Example:

| Endpoint           | Method | Description                                    | Request Body Example        | Response Body Example                                                                                             |
| ------------------ | ------ | ---------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/users/register`  | POST   | Registers a new user.                          | `{ name: "...", email: "...", password: "..." }` | `{ success: true, message: "User registered successfully" }`                                                       |
| `/users/login`     | POST   | Logs in an existing user.                       | `{ email: "...", password: "..." }` | `{ success: true, message: "Login successful", token: "..." }`                                                                |
| `/trainers`        | GET    | Gets all trainers.                              | None                        | `[ { name: "...", experience: "...", ... }, ... ]`                                                              |
| `/classes`         | GET    | Gets all classes (supports pagination & search) | `?page=2&search=yoga`       | `[ { name: "...", description: "...", ... }, ... ]`                                                              |
| `/forum/posts`      | GET    | Gets all forum posts (supports pagination)      | `?page=1`                  | `[ { title: "...", content: "...", userId: "...", upvotes: 0, downvotes: 0, user: { name: "...", role: "..." } }, ... ]` |
| `/forum/posts/:id/vote` | POST   | Upvotes or downvotes a specific post.              | `{ email: "...", vote: 1 }`      | `{ success: true, message: "Vote updated successfully." }`                                                          |

## Contributing

If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise commit messages.
4.  Submit a pull request.


## Contact

Kamrul Hasan - khrimon377@gmail.com

## Additional Notes

*   Before deploying to production, be sure to update your `.env` files with production-specific values (especially your database connection string and JWT secret).
*   Ensure your application is served over HTTPS in production.
*   Implement robust input validation to prevent security vulnerabilities.
*   Monitor your application for performance and security issues.
