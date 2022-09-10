import React from "react";
import s from "./Footer.module.scss";
import { ReactComponent as Odnoklasniki } from "../../assets/img/odnoklasniki.svg";
import { ReactComponent as VkLogo } from "../../assets/img/vk.svg";
import { ReactComponent as TelephonSprite } from "../../assets/img/telephonSprite.svg";

const Footer = () => {
  return (
    <div className={s.footer}>
      <div className={s.root}>
        <div className={s.block}>
          <a
            href={"https://ok.ru/profile/231675220098"}
            target="_blank"
            rel="noreferrer"
          >
            <Odnoklasniki />
          </a>
          <div className={s.wrapTelSprite}>
            <a href={"tel: +79082353647"} target="_blank" rel="noreferrer">
              <TelephonSprite />
            </a>
          </div>
          <a
            href={"https://vk.com/id605758036"}
            target="_blank"
            rel="noreferrer"
          >
            <VkLogo />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
