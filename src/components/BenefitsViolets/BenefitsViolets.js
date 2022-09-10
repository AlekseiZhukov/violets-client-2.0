import React from "react";
import { ReactComponent as HomeSvg } from "../../assets/img/homeIcon.svg";
import { ReactComponent as CrownSvg } from "../../assets/img/korona.svg";
import { ReactComponent as MedicViolet } from "../../assets/img/medicViolet.svg";
import s from "./BenefitsViolets.module.scss";

const BenefitsViolets = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.wrapTextBlocks}>
          <div className={s.textBlock}>
            <HomeSvg />
            <p>
              Фиалка приносит в дом спокойствие, гармонию, чистит пространство
              от негатива. Фиалки создают комфортную среду. Ухаживание за
              фиалками умиротворяет и улучшает настроение.
            </p>
          </div>
          <div className={s.textBlock}>
            <MedicViolet />
            <p>
              Известно, что аромат фиалок – это прекрасное средство,
              расслабляющее тело, умиротворяющее душу и укрепляющее дух,
              заряжает оптимизмом и дает силы на само исцеление.
            </p>
          </div>
          <div className={s.textBlock}>
            <CrownSvg />
            <p>
              Фиалка - просто удивительный цветок, который, поражает своей
              трогательной красотой, нежностью и изысканностью. Это королева
              комнатных растений.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsViolets;
