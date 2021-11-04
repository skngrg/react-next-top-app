import React from 'react';
import { FooterProps } from "./Footer.props";
import { format } from 'date-fns'

import cn from 'classnames';
import styles from './Footer.module.css';

const Footer = ({className, ...props}: FooterProps) => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <div>
                OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
            </div>
            <a href="#" target={'_blank'}>Пользовательское соглашение</a>
            <a href="#" target={'_blank'}>Политика конфиденциальности</a>
        </footer>
    );
};

export default Footer;