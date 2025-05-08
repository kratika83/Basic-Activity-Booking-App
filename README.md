# 🏏 Activity Booking API

A Node.js REST API for managing user registration, listing activities (like cricket, movies, football matches, etc.), and booking them. Users can register, log in, view all activities, 
and book events after authentication.

---

## 🚀 Features

- User Registration & Login with JWT Authentication
- List Public Activities
- Book an Activity (Protected Route)
- View My Bookings (Protected Route)
- Request validation using Joi
- MongoDB with Mongoose ODM

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (with Mongoose)  
- **Authentication:** JWT  
- **Validation:** Joi  
- **Environment Management:** dotenv  
- **API Testing:** Postman  

---

## Author
Kratika Sharma
Feel free to connect or raise issues!

---

## 🔧 Setup Instructions

 1. Clone the Repository

```bash
git clone https://github.com/your-username/activity-booking-api.git
cd activity-booking-api

 2. Install Dependencies 
npm install

3. Configure Environment Variables
Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/basic_activity_booking
JWT_SECRET=your_secure_jwt_secret

4. Start the Server

npm start   # With nodemon
# or
node index.js
Server runs on: http://localhost:5000

