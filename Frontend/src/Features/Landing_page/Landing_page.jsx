import { useNavigate, Link} from "react-router";
import React from "react";
import "./Landing_page.css"
import {
  Sparkles,
  ArrowRight,
  Upload,
  Users,
  Star,
  ShieldCheck,
  UserRound
} from "lucide-react";




const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <a href="#about">
        <div className="logo">
          <div className="logo-box">
            ✣
          </div>
          Prep<span>AI</span>
        </div>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a>Features</a>
          <a href="#works">How It Works</a>
          <a>Contact Us</a>

        </div>
        <div className="nav-buttons">
          <button className="signin">
            <Link to={'/login'}>
            Sign In
            </Link>
          </button>

          <button className="start">
            <Link to={'/register'}>
            Get Started
            </Link>
          </button>
        </div>
      </nav>
      {/* Hero */}
      <section className="hero" id="about">
        <div className="badge">

          <Sparkles size={16} />
          AI-POWERED INTERVIEW INTELLIGENCE
        </div>

        <h1>
          Ace Every Interview.

          <br />

          <span>
            Land the Role.
          </span>

        </h1>

        <p>

          Upload your resume and get an instant AI analysis —
          personalized questions, skill gap diagnosis,
          and a readiness score in under 30 seconds.

        </p>

        <div className="hero-buttons">
          <button className="primary">
            <Link to={'/register'}>
            Get Started Free
            </Link>
            <ArrowRight />
          </button>
        </div>
      </section>
      <section className="hero-1" id="works">
        <div className="process-container">
          <h4>PROCESS</h4>
        </div>
         <h3>
          From Resume To Ready
          <br />
          <span>
            In 4 Steps
          </span>
        </h3>

        <div className="container">
          <div className="small-container">
            <span className="number">01</span>
            <div className="content">Create Account</div>
            <div className="para">Sign up in 30 seconds. No credit card required.</div>
          </div>
         <div className="small-container">
            <span className="number">02</span>
            <div className="content">Upload Your Resume</div>
            <div className="para">PDF or DOCX. Our parser handles any format..</div>
        </div>
        <div className="small-container">
            <span className="number">03</span>
            <div className="content">AI Analysis</div>
            <div className="para">Deep scan across 40+ competency dimensions.</div>
        </div>
        <div className="small-container">
            <span className="number">04</span>
            <div className="content">Review & Practice
          </div>
            <div className="para">Work through your personalized question bank.</div>
        </div>
        </div>

        <button className="start-now">Start Now -- it's Free  </button>
      </section>

      {/* <section className="contact-us">
        <h3>Contact</h3>
        <div className="contact"></div>
      </section> */}
    </div>
  )

}

export default Landing;