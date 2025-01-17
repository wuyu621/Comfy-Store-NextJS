# Comfy Store-NextJS

Welcome to **Comfy Store-NextJS**, a full-stack e-commerce web application where users can browse search and purchase products with ease using NextJS.

Check out the live version of the app using demo user test@test.com and password:test1234 :

[Comfy Store](https://nextjs-comfystore.vercel.app/)

---

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Technologies Used](#technologies-used)

## Features

- **Browse and Search Products**: Explore and search a wide variety of products with detailed descriptions, supporting both grid and line layouts for easier navigation.  
- **Product Reviews and Ratings**: Logged-in users can add, delete, and view reviews for products. The system calculates and displays average ratings for each product automatically.  
- **Shopping Cart and Order Placement**: Users can add items to a shopping cart, adjust quantities, and complete orders seamlessly, with secure payment processing integrated via Stripe.  
- **User Authentication**: Secure user sign-up, login, and profile management powered by Clerk.  
- **Admin Product Management**: Administrators can add, delete, update, and view product data directly within the platform, ensuring effective inventory control.  
- **Data Storage and Management**: All application data is securely stored and managed using Prisma and Supabase, ensuring efficient and reliable database operations.  
- **Responsive Design**: The platform is optimized for usability across desktops, tablets, and mobile devices.  
- **Dark Mode**: Provides an adjustable light and dark theme for a personalized and visually comfortable user experience.  


## Demo

You can view a live demo of the project on Vercel:
[Comfy Store Live Demo](https://nextjs-comfystore.vercel.app/)


## Installation

To run the project locally, you'll need to clone the repository and install the dependencies using `npm` or `yarn`.

```
git clone https://github.com/wuyu621/Comfy-Store-NextJS
cd my-project
npm install
```

or

```
yarn install
```

Then, start the development server:

```
npm run dev
```

or

```
yarn dev
```

The project should be running at [http://localhost:3000](http://localhost:3000).

## Technologies Used

- **Next.js**: For building a modern, server-side rendered user interface.  
- **TypeScript**: Ensures type safety and reduces runtime errors by catching issues during development.  
- **Tailwind CSS**: Enables rapid and responsive styling with utility-first classes.  
- **shadcn/ui**: Provides pre-built UI components, speeding up development.  
- **Clerk**: Handles secure user authentication and management.  
- **Supabase and Prisma**: Facilitates cloud-based data storage and seamless database operations.  
- **Stripe**: Integrates a secure and reliable payment processing system.  



