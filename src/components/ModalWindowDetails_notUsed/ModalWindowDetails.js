import React, { useEffect, useState } from "react";
import cn from "classnames";
import s from "./ModalWindowDetails.module.scss";
import Viewer from "react-viewer";

const ModalWindowDetails = ({ onShowModal, src }) => {
  const [visible, setVisible] = useState(false);

  /* useEffect(() => {
    const el = document.getElementsByTagName("body")[0];
    el.style.overflowY = "hidden";
    console.log(el);
    return () => {
      el.style.overflow = "";
    };
  }, []);*/
  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <div className={s.hystmodalWindow}>
          <button onClick={onShowModal} className={s.hystmodalClose}>
            close
          </button>
          <h1>Заголовок модального окна</h1>
          <div>
            <button
              onClick={() => {
                setVisible(true);
              }}
            >
              show
            </button>
            <Viewer
              noNavbar
              scalable={false}
              loop={false}
              showTotal={false}
              visible={visible}
              onClose={() => {
                setVisible(false);
              }}
              images={[{ src: src, alt: "Martin arrantzalea" }]}
            />
          </div>

          <p>Текст модального окна ...</p>

          <p>Ещё текст модального окна ...</p>
        </div>
      </div>
      ModalWindowDetails
    </div>
  );
};

export default ModalWindowDetails;
