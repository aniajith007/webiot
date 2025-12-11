import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Controller from "./Pages/Controller";
import Controller2 from "./Pages/Controller2"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <Controller /> */}
      <Controller2 />
    </>
  );
}

export default App;
