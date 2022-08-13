import React, { useEffect, useRef, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "./register.css";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{2,24}$/;
// reducer
const ACTION = {
  USER: "user",
  VALID_NAME: "validName",
  USER_FOCUS: "userFocus",
  PWD: "pwd",
  VALID_PWD: "validPwd",
  PWD_FOCUS: "pwdFocus",
  MATCH_PWD: "matchPwd",
  VALID_MATCH: "validMatch",
  MATCH_FOCUS: "matchFocus",
  ERR_MSG: "errMsg",
  SUCCESS: "success",
};
const initialState = {
  user: "",
  validName: false,
  userFocus: false,
  pwd: "",
  validPwd: false,
  pwdFocus: false,
  matchPwd: "",
  validMatch: false,
  matchFocus: false,
  errMsg: "",
  success: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "validName":
      return { ...state, validName: action.payload };
    case "userFocus":
      return { ...state, userFocus: action.payload };
    case "pwd":
      return { ...state, pwd: action.payload };
    case "validPwd":
      return { ...state, validPwd: action.payload };
    case "pwdFocus":
      return { ...state, pwdFocus: action.payload };
    case "matchPwd":
      return { ...state, matchPwd: action.payload };
    case "validMatch":
      return { ...state, validMatch: action.payload };
    case "matchFocus":
      return { ...state, matchFocus: action.payload };
    case "errMsg":
      return { ...state, errMsg: action.payload };
    case "success":
      return { ...state, success: action.payload };
    default:
      throw new Error("an error occured");
  }
};
export default function Register() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(state.user);
    
    dispatch({ type: ACTION.VALID_NAME, payload: result });
  }, [state.user]);
  useEffect(() => {
    const result = PWD_REGEX.test(state.pwd);
    console.log(result);
    console.log(state.pwd);
    dispatch({ type: ACTION.VALID_PWD, payload: result });
    const match = state.pwd === state.matchPwd;
    dispatch({ type: ACTION.VALID_MATCH, payload: match });
  }, [state.pwd, state.matchPwd]);
  useEffect(() => {
    dispatch({ type: ACTION.ERR_MSG, payload: "" });
  }, [state.pwd, state.user, state.matchPwd]);
  async function handleSubmit(e) {
    e.preventDefault();
    // if button enabled with JS hack from DOM
    const v1 = USER_REGEX.test(state.user); 
    const v2 = PWD_REGEX.test(state.pwd);
    if (!v1 || !v2) {
      dispatch({ type: ACTION.ERR_MSG, payload: "Invalid Entry" });
      return;
    }
    console.log(state.user, state.pwd);
    dispatch({ type: ACTION.SUCCESS, payload: true });
  }
  return (
    <>
      {state.success ? (
        <section>
          <h1>Success</h1>
          <p>
            <a href="#/">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} aria-live="assertive" className={state.errMsg}>
            {state.errMsg ? "errmsg" : ""}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={state.validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={state.validName || !state.user ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) =>
                dispatch({ type: "user", payload: e.target.value })
              }
              required
              aria-invalid={state.validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() =>
                dispatch({ type: ACTION.USER_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: ACTION.USER_FOCUS, payload: false })
              }
            />
            <p
              id="uidnote"
              className={
                state.userFocus && state.user && !state.validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="password">
              Password:
              <span className={state.validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={state.validPwd || !state.pwd ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) =>
                dispatch({ type: ACTION.PWD, payload: e.target.value })
              }
              required
              aria-invalid={state.validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() =>
                dispatch({ type: ACTION.USER_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: ACTION.USER_FOCUS, payload: false })
              }
            />
            <p
              id="pwdnote"
              className={
                state.pwdFocus && state.pwd && !state.validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include upper and lowercase letters, a number and a special
              character.
              <br />
              Allowed specil characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percentage">%</span>
            </p>
            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span
                className={
                  state.validMatch && state.matchPwd ? "valid" : "hide"
                }
              >
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  state.validMatch || !state.matchPwd ? "hide" : "invalid"
                }
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) =>
                dispatch({ type: ACTION.MATCH_PWD, payload: e.target.value })
              }
              required
              aria-invalid={state.validMatch ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() =>
                dispatch({ type: ACTION.VALID_MATCH, payload: true })
              }
              onBlur={() =>
                dispatch({ type: ACTION.VALID_MATCH, payload: true })
              }
            />
            <p
              id="confirmnote"
              className={
                state.matchFocus && !state.validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <button
              disabled={
                !state.validName || !state.validMatch || !state.validPwd
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <a href="#/">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
