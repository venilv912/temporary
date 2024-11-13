import './ForgotPassword.css';
import { Link } from 'react-router-dom';
export default function ForgotPassword() {
    return (
        <div className="container">
          <div className="forgot-password">
            <form>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ysGLsZfbPr6zprdlKrSSo30yCkac7NB9iw&s" alt="" className='img' /> 
            <h1>Forgot Password</h1>
              <input type="email" placeholder="Email" required/>
              <button type="submit">Reset Password</button>
              <Link to="/sign">
              <p>Back to Log In</p>
              </Link>
            </form>
          </div>
          <div className="toogle-container">
            <div className="toogle">
              <div className="toogle-panel toogle-right">
                <h1>Password Recovery</h1>
                <p>Enter your email address and we'll send you instructions to reset your password.</p>
              </div>
            </div>
          </div>
        </div>
      );
};