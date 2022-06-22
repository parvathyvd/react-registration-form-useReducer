import { useReducer } from "react";
import "./App.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload.value };
    case "email":
      return { ...state, email: action.payload.value };
    case "password":
      return { ...state, password: action.payload.value };
    case "repeat":
      return { ...state, confirmPassword: action.payload.value };
    case "accept":
      return { ...state, termsAccepted: action.payload.value };
    case "reset":
      return initialState;
    default:
      return { ...state };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert(`${state.name} you have successfully registered`);
    dispatch({ type: "reset" });
  };

  const validateState = (state) => {
    return (
      state.password === state.confirmPassword &&
      state.termsAccepted &&
      state.password.length > 3 &&
      state.name !== ""
    );
  };

  const onChangeHandler = (e) => {
    const { name, value, checked } = e.target;
    const action = {
      input: name,
      value: name === "accept" ? checked : value,
    };
    dispatch({ type: e.target.name, payload: action });
  };
  return (
    <main className="main-wrapper">
      <h1>Register</h1>
      <form className="register-form">
        <input
          type="text"
          placeholder="Name"
          className="name"
          name="name"
          value={state.name}
          onChange={onChangeHandler}
        />
        <input
          type="email"
          placeholder="Email"
          className="email"
          name="email"
          value={state.email}
          onChange={onChangeHandler}
        />
        <input
          type="password"
          placeholder="Password"
          className="password"
          name="password"
          value={state.password}
          onChange={onChangeHandler}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          className="pwd-confirm"
          name="repeat"
          value={state.confirmPassword}
          onChange={onChangeHandler}
        />
        <div className="terms">
          <input
            type="checkbox"
            className="accept"
            name="accept"
            checked={state.termsAccepted}
            onChange={onChangeHandler}
          />
          <span>Accept terms of use</span>
        </div>
        <button
          className={`btn-submit ${!validateState(state) && "disabled"}`}
          onClick={onSubmitHandler}
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default App;
