# 🌍 BorderEase - Visa Navigator Portal

BorderEase is a comprehensive Visa Navigator Portal designed to simplify the complexities of international travel. It allows users to check visa requirements, check details, apply for visas online, and track their applications seamlessly.

## 🔗 Live Website
[**Visit BorderEase**](https://border-ease.vercel.app/)

## ✨ Key Features

- **🔐 Robust Authentication:** Secure user login and registration using Email/Password and Google Social Login via Firebase.
- **🎨 Dynamic Theming:** Fully integrated Dark/Light mode toggle for a personalized user experience.
- **🛂 Visa Management:**
  - **Browse:** Explore a vast collection of visas with advanced filtering by visa type.
  - **Contribution:** Users can add new visa information to the database.
  - **My Visas:** Manage (Update/Delete) the visa entries you've added.
- **📝 Application System:**
  - **Apply:** Simple modal-based application process.
  - **Track:** View all your submitted visa applications in one place.
  - **Search:** Real-time search functionality to find specific applications by country.
- **📱 Responsive Design:** Fully optimized interface for Mobile, Tablet, and Desktop devices.
- **⚡ Interactive UI:** fast loading states, smooth animations, and engaging user feedback (toasts, tooltips).

## 🛠️ Technology Used

**Frontend:**
- **React 19** - Library for building user interfaces
- **React Router 7** - For seamless client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI 5** - Component library for Tailwind
- **Firebase** - Authentication

**Backend:**
- **Node.js & Express.js** - Server-side runtime and framework
- **MongoDB** - NoSQL database for storing visa and application data

**Notable Packages:**
- `react-awesome-reveal` - For scroll animations
- `react-tooltip` - For informative hover effects
- `swiper` - For touch-enabled sliders
- `react-hot-toast` - For beautiful notifications
- `react-icons` - For vector icons

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Border-Ease-Client.git
   cd Border-Ease-Client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your Firebase and Backend API keys:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📸 Usage

- **Home:** View latest visas and banner slider.
- **All Visas:** Browse and filter all available visa options.
- **Add Visa:** Contribute by adding missing visa details (Login required).
- **My Applications:** Track the status of your visa applications (Login required).

---
## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
