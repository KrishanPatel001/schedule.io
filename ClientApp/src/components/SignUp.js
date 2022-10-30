import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";


const NameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const PassRegex = /(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

const SignUpForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validUser, setValidUser] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = NameRegex.test(user);
    setValidUser(result);
  }, [user])

  useEffect(() => {
    setValidPwd(PassRegex.test(pwd));
  }, [pwd])

  useEffect(() => {
    setValidEmail(EmailRegex.test(email));
  }, [email])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const NameTest = NameRegex.test(user);
    const PassTest = PassRegex.test(pwd);
    const EmailTest = EmailRegex.test(email);
    if (!NameTest || !PassTest || !EmailTest) {
      setErrMsg("Invalid Info");
      return;
    }
    try {
      const account =  {
        name: user,
        email: email,
        password: pwd,
      };
      const response = await axios.post("/user", account);
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      setUser('');
      setPwd('');
      setEmail('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 500) {
        setErrMsg('EMAIL ALREADY REGISTERED!');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>Welcome to Schedule.io</h1>
          <p>
            <a href="#/sign-in">Sign In</a>
          </p>
        </section>
        ) : (
          <section className="formCenter">
            <div className="loud"><p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p></div>
            <form onSubmit={handleSubmit} className="formFields">
              <div className="formField">
                <label className="formFieldLabel" htmlFor="username">
                  Full Name
                  <FontAwesomeIcon icon={faCheck} className={validUser ? "valid green" : "hiden"} />
                  <FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hiden" : "invalid red"} />
                </label>
                <input
                  type="text"
                  id="name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validUser ? "false" : "true"}
                  className="formFieldInput"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                  <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid green" : "hiden"} />
                  <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hiden" : "invalid red"} />
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="formFieldInput"
                  placeholder="Enter your Password"
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hiden"}>
                    6 characters minimum.<br />
                    At least one:<br />Uppercase letter, Lowercase letter, Number and Special Character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                  <FontAwesomeIcon icon={faCheck} className={validEmail && email ? "valid green" : "hiden"} />
                  <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hiden" : "invalid red"} />
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="formFieldInput"
                  placeholder="Enter your Email"
                />
                <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "hiden"}>
                  Must be a valid email address.
                </p>
              </div>
              <div className="formField">
                <button className="formFieldButton" disabled={!validUser || !validPwd || !validEmail ? true : false}>Sign Up</button>{" "}
                <Link to="/sign-in" className="formFieldLink">
                  I'm already member
                </Link>
              </div>
            </form>
          </section>
        )
      }
    </>
  )
}

export default SignUpForm
