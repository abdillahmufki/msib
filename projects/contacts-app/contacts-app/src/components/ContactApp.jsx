import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
import Navigation from "./Navigation";
import HomePage from "../pages/HomePage";
import AddPage from "../pages/AddPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { getUserLogged, putAccessToken } from "../utils/api";

class ContactApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true, // Initialize initializing state
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this); // Bind onLogout method
  }

  async componentDidMount() {
    try {
      const { data } = await getUserLogged();
      this.setState(() => ({
        authedUser: data,
        initializing: false,
      }));
    } catch (error) {
      this.setState(() => ({ initializing: false }));
    }
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    try {
      const { data } = await getUserLogged();
      this.setState(() => ({
        authedUser: data,
      }));
    } catch (error) {
      // Handle error if necessary
    }
  }

  onLogout() {
    this.setState(() => ({
      authedUser: null,
    }));
    putAccessToken("");
  }

  render() {
    const { initializing, authedUser } = this.state; // Destructure state
    if (initializing) {
      return null; // Return null while initializing
    }

    return (
      <div className="contact-app">
        <header className="contact-app__header">
          <h1>Aplikasi Kontak</h1>
          <Navigation logout={this.onLogout} name={authedUser?.name} />{" "}
          {/* Pass name prop */}
        </header>
        <main>
          <Routes>
            {/* Redirect to HomePage if user is authenticated */}
            {authedUser ? (
              <Route path="/" element={<HomePage />} />
            ) : (
              <Route
                path="/*"
                element={<LoginPage loginSuccess={this.onLoginSuccess} />}
              />
            )}
            {/* Public routes */}
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected route */}
            <Route
              path="/add"
              element={authedUser ? <AddPage /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    );
  }
}

export default ContactApp;
