import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";

import "../App.css";

const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
const PassRegex = /(?=^.{6,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;

const SignInForm = () => {
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidPwd(PassRegex.test(pwd));
  }, [pwd])

  useEffect(() => {
    setValidEmail(EmailRegex.test(email));
  }, [email])

  useEffect(() => {
    setErrMsg('');
  }, [pwd, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const EmailTest = EmailRegex.test(email);
    const PassTest = PassRegex.test(pwd);
    if (!PassTest || !EmailTest) {
      setErrMsg("Invalid Info");
      return;
    }
    try {
      const account =  {
        email: email,
        password: pwd,
      };
      const response = await axios.post("/user/sign-in", account)
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      setEmail('');
      setPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 500) {
        setErrMsg('EMAIL OR PASSWORD INCORRECT!');
      } else {
        setErrMsg('Login Failed')
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
            <form className="formFields" onSubmit={handleSubmit}>
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
                <button className="formFieldButton" disabled={!validPwd || !validEmail ? true : false}>Sign In</button>{" "}
                <Link to="../../sign-up" className="formFieldLink">
                  Create an account
                </Link>
              </div>
            </form>
          </section>
        )
      }
    </>
  )
}

export default SignInForm