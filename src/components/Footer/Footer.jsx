import React from 'react'
import css from './Footer.module.css'
import instagramLogo from '../../../assets/img/instagram.svg'
import vkLogo from '../../../assets/img/vk.svg'
import odnoklassnikiLogo from '../../../assets/img/odnoklasniki.svg'
import {useMediaQuery} from "react-responsive";

const Footer = () => {
    const isMobile = useMediaQuery({maxWidth: 577})
    return (
        <div className={isMobile ? css.footerMobile : css.footer}>
            <div className={'wrapper'}>
                <div className={isMobile ? css.blockMobile : css.block}>
                    <a href={'https://www.instagram.com/olena2602/'}  target="_blank" rel='noreferrer'> <img className={isMobile ? css.imgMobile : css.img} src={instagramLogo} alt=""/></a>
                    <a href={'https://vk.com/id605758036'} target="_blank" rel='noreferrer'> <img className={isMobile ? css.imgMobile : css.img} src={vkLogo} alt=""/></a>
                    <a href={'https://ok.ru/profile/231675220098'} target="_blank" rel='noreferrer'> <img className={isMobile ? css.imgMobile : css.img} src={odnoklassnikiLogo} alt=""/></a>
                </div>
            </div>
        </div>
    )
}

export default Footer