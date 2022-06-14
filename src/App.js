import React from "react";
import image1 from "../src/assets/img/phot02.jpg";
//import imageLogo from "../src/assets/img/logoViolet.svg";
import { ReactComponent as Logo } from "../src/assets/img/logoViolet.svg";
import s from "./App.module.scss";

const App = () => {
  return (
    <>
      <div className={s.root}>
        <h1>This is App component h1</h1>
        <h2>This is App component h2</h2>
        <h3>This is App component h3</h3>

        <div>
          <img src={image1} alt="image1" />
        </div>
        <div>
          <Logo />
        </div>
      </div>
    </>
  );
};

export default App;
