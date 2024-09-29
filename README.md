# Event Meet
**EventMeet** is a social media event management platform designed to help users discover, share, and engage with events ranging from local meetups to large conferences. Our goal is to create an intuitive platform where users can connect with event organizers, participate in event discussions, and get personalized recommendations based on their interests.

## Project Overview

**The EventMeet platform enables users to:**
- Discover and search for upcoming events by category, location, or date.
- Share and promote their own events, including ticketing options.
- Engage with event content through likes, comments, and sharing functionalities.
- Organize and manage events with a seamless interface for organizers.

## Team Members

- **Jesufemi Oladapo** (Nigeria): Full-stack Developer proficient in Python, JavaScript, and frameworks such as Flask, React.js, and Node.js.
- **Amanda Mabunda** (South Africa): Full-stack Developer skilled in Python, JavaScript, Flask, React.js, and Node.js.
- **Belem** (Morocco): Full-stack Developer specializing in Python, JavaScript, Flask, React.js, and Node.js.
- **Chukwu** (Nigeria): Frontend Developer with expertise in React.js, Node.js, and JavaScript.

## Key Features

1. ### Event Discovery
- Users can view a list of all upcoming events fetched from the backend.
- Events are displayed based on categories, location, or date, allowing users to explore events most relevant to them.
- Featured and upcoming events sections highlight popular or new events.

2. ### Event Management
- Organizers can create events, upload thumbnails, and edit or delete their events.
- Users can manage their personal events and see events they are attending.

3. ### User Engagement
- Like and dislike functionality allows users to interact with events.
- Users can search for events using keywords, categories, or user IDs.

4. ### Promotions and Ticketing
- Organizers can promote their events within the platform.
- The platform integrates event ticketing to facilitate registration.

5. ### Backend Structure
- API-based architecture using Axios for handling HTTP requests.
- Secure authentication with JWT tokens for authorization.

## Code Feature Breakdown
**Event Fetching**
- The platform fetches event data via the API using the axios library. Functions like getEvents, getEvent, getEventsByCategories, and getEventsByLocation allow users to view event details in multiple ways.

**Event Creation**
- Event organizers can create events, which are securely sent to the backend using the createEvent function with an authorization token.

**Thumbnail Upload**
- Users can upload event thumbnails for visual appeal, handled through a multipart/form-data request.

## Architectural Overview

### Frontend
- **React.js:** The app is built using React for a component-based, dynamic user interface.
- **React Router:** Ensures smooth navigation across pages, including user account, events, and categories.
- **Tailwind CSS:** Used for styling, providing a clean and responsive design.

### Backend
**Node.js & Express:** The backend server handles event data management, user authentication, and API requests.
**MySQL:** The database is managed using Sequelize ORM for efficient interaction with MySQL.
**Redis:** Enhances performance through caching.
**Bull:** A queue management system for handling background jobs such as email notifications and event promotions.

## Technologies Used

### Frontend
- **React:** For building dynamic user interfaces.
- **React Router:** For smooth navigation.
- **Tailwind CSS:** For responsive styling.
- **Axios:** For making HTTP requests to the backend.

### Backend
- **Node.js:** Backend development with JavaScript.
- **Express.js:** Framework for building API endpoints.
- **MySQL:** For database management.
- **Redis:** For caching frequently accessed data.
- **Bull:** For background job handling.
- **Postman:** For testing API endpoints.

## Getting Started

### Prerequisites
- Node.js and npm installed.
- MySQL and Redis configured.

### Installaton
1. Clone the repository
2. Install dependencies
3. Set up environment variables in .env
4. Run the app

## Screenshots

![Home Page](./images/https://imgur.com/Axz2i3l)

![Event List Page](./images/https://imgur.com/Ms0WKli)

![Event Creation Form](./)

![User Dashboard](./)

## Contributing 

We welcome contributions! Feel free to fork this project, make improvements, and submit a pull request.


