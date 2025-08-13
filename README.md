# Wiremit Frontend Developer Technical Interview Project

## 📌 Project Overview
This is a single-page web application built with **React** and **Tailwind CSS** for the Wiremit Frontend Developer Technical Interview.  
The app enables **Zimbabwean parents** to send pocket money to their children studying in the **UK** or **South Africa**.

Key features include:
- Modularized front-end architecture
- Client-side routing
- Mocked user authentication
- Currency conversion using a mock FX rate API
- Transaction history
- Mock ads carousel

---

## 🚀 How to Run the App

1. **Clone the repository**
   ```bash
   git clone [your-github-repo-url]
   ```

2. **Navigate into the project directory**
   ```bash
   cd wiremit-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. The application should open automatically in your browser at  
   **http://localhost:5173**

---

## 🛠 Design & Architectural Choices

### 1. Interpretation of Unclear Requirements
- **Mock Account Storage**  
  Accounts are stored in `localStorage` to meet the non-persistent storage requirement without needing a backend or database.
  
- **Multiple Accounts**  
  Supports multiple accounts by storing an array of user objects in `localStorage`.

- **Dynamic Transaction Fee**  
  Fee calculation is centralized in the **Dashboard** component, making it easy to adjust fees or fetch them from an API in future.

---

### 2. Component Structure & Data Flow
- **`App.js`**  
  Entry point that manages global state (`currentUser`, `fxRates`) and sets up routing via `react-router-dom`.

- **`pages/` directory** contains:
  - `LoginPage.js` – Handles login logic & UI.
  - `SignupPage.js` – Manages account creation.
  - `Dashboard.js` – Central hub for authenticated features.

**Data Flow:**  
State is managed at the highest necessary level (`App.js`) and passed down as props.  
Actions (e.g., login) trigger functions passed as props, updating state in `App.js`.

---

### 3. Scalability for More Countries or Currencies
- **API Integration**  
  FX rates are fetched from a single endpoint and stored as:
  ```js
  { "GBP": 0.74, "ZAR": 17.75 }
  ```
  Adding new currencies requires only ensuring the API returns them and adding an `<option>` in the selector.

- **Modular Components**  
  New sections (e.g., "Account Settings") can be added by creating a component and route without affecting existing pages.

---

## 🔍 Areas of Interest to the Team
- **Security Considerations**  
  In production, passwords should be hashed on a backend server (not stored in plain text in `localStorage`).

- **Mobile Responsiveness**  
  Built with **Tailwind CSS** (mobile-first), ensuring adaptability to various screen sizes.

- **UI/UX**  
  Intuitive flow from login/signup to dashboard.  
  Uses a custom non-intrusive message box for feedback (replacing `alert()`).

- **Input Validation**  
  - Forms require non-empty fields.
  - Amount inputs use `min` and `max` HTML attributes for validation.

---

## 📷 Screenshots
*(Add your screenshots here if available)*

---

## 📄 License
This project is for **technical interview purposes** only and not intended for production use.
