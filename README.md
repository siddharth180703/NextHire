#NextHire – Job Portal Web App

NextHire is a full-featured MERN stack job portal where recruiters can post job openings and applicants can apply after qualifying a short quiz. The platform is designed to make hiring efficient and intelligent by assessing applicants' relevance before allowing them to apply.

## 📸 Features

🔍 For Job Seekers:

1.Browse job listings with detailed descriptions.

2.Take a 3-question quiz to validate eligibility before applying.

3.Apply to jobs directly through the portal.

4.View application status (e.g., "Already Applied").

🧑‍💼 For Recruiters

1.Create job listings with: Title, description, location, type, experience, salary, etc.

2.Custom 3-question quizzes (with options and correct answer index).

3.View list of applicants for each job post.

4.Accept/Decline the application of Applicant.

## 🔐 Authentication

1.Secure login/signup with JWT and cookies.

2.User roles: Recruiter or Applicant.

## 🛠️ Tech Stack

Tech Description
MongoDB Database for storing users, jobs, and applications
Express.js RESTful API backend
React.js Frontend user interface
Node.js Server-side runtime
Redux Toolkit State management
Axios API calls
Tailwind CSS + ShadCN UI styling
Lottie Animations For enhanced UX
JWT & Cookies User authentication

## ✨ Unique Features

✅ Quiz-based job applications to ensure quality applicants.

🚫 Disabled “Apply” button after successful application.

🔄 Real-time UI updates using Redux after applying or posting jobs.

🎨 Responsive dark/light UI with Tailwind & animations.

## 🧱 Tech Stack

| Technology    | Description                                              |
| ------------- | -------------------------------------------------------- |
| MongoDB       | NoSQL database for storing users, jobs, and applications |
| Express.js    | Node.js backend framework for APIs                       |
| React.js      | Frontend single-page application                         |
| Node.js       | Backend JavaScript runtime                               |
| Redux Toolkit | Global state management                                  |
| Tailwind CSS  | Utility-first CSS framework                              |
| ShadCN/UI     | Elegant UI components                                    |
| Lottie        | Animations for UI                                        |

---

## 🗂️ Project Structure

<details> <summary>Click to expand</summary>
NextHire/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── redux/
│ │ ├── utils/
│ │ └── App.jsx
│
├── .env
├── README.md
└── package.json
</details>
## ⚙️ Environment Variables

Create a `.env` file in the `backend` folder with the following:

```env
PORT=5000
MONGODB_URI=your_mongo_connection_string
SECRET_KEY=your_jwt_secret
CLIENT_URL=http://localhost:5173

```
