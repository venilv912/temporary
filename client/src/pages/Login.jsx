import { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
export default function Login() {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      marginTop: 75,
      padding: 0,
    }}>
    <div className={`login-page`}>
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className="sign-up">
        <form>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ysGLsZfbPr6zprdlKrSSo30yCkac7NB9iw&s" alt="" className='img' />
          <h1>Create Account</h1>
          <br />
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button>Sign Up</button>
        </form>
      </div>

      <div className="sign-in">
        <form>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ysGLsZfbPr6zprdlKrSSo30yCkac7NB9iw&s" alt="" className='img' />
          <h1>Real Estate</h1>
          <br />
          <h2>Log In</h2>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button>Log In</button>
        </form>
      </div>

      <div className="toogle-container">
        <div className="toogle">
          <div className="toogle-panel toogle-left">
            <h1>Welcome User!</h1>
            <p>If you already have an account</p>
            <button id="login" onClick={handleLoginClick}>
              Sign In
            </button>
          </div>
          <div className="toogle-panel toogle-right">
            <h1>Hello, User!</h1>
            <p>If you don't have an account</p>
            <button id="register" onClick={handleRegisterClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};