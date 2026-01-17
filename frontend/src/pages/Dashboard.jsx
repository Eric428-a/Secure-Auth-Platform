// frontend/src/pages/Dashboard.jsx

import React from "react";

const Dashboard = () => {
  return (
    <div className="dashboard-root">
      {/* Background stars */}
      <div className="star-field">
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
        <span className="star" />
      </div>

      {/* Main content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>

        {/* Company description */}
        <div className="dashboard-card">
          <p className="dashboard-text">
            Welcome to <strong>Haumena Solutions Inc.</strong>, a cutting-edge company at the 
            intersection of <strong>Artificial Intelligence</strong>, 
            <strong> Machine Learning</strong>, and <strong>Civil Engineering</strong>. 
            Our mission is to develop intelligent systems and innovative infrastructure 
            solutions that transform industries and improve everyday life.
          </p>

          <p className="dashboard-text">
            We specialize in designing robust AI and ML applications, predictive 
            analytics, automation tools, and smart civil engineering solutions. 
            By combining advanced technology with engineering expertise, we deliver 
            secure, scalable, and efficient systems tailored for modern challenges.
          </p>

          <p className="dashboard-text">
            <strong>Haumena Solutions Inc.</strong> is committed to excellence, innovation, and 
            integrity, ensuring that every project we undertake exceeds expectations 
            and sets new standards in both technology and engineering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
