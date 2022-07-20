import React from "react";
import preloader from "./puff.svg";
import css from './Preloader.module.css'

const Preloader = (props) => {
    return <div className={css.preloader}>
        <img src={preloader} alt={""}/>
    </div>
}

export default Preloader;