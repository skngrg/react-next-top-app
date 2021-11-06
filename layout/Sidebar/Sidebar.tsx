import React from 'react';
import { SidebarProps } from "./Sidebar.props";

import styles from './Sidebar.module.css';
import cn from 'classnames';
import Logo from '../mainlogo.svg';
import Menu from "../Menu/Menu";

const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    return (
        <div
            className={cn(className, styles.sidebar)}
            {...props}
        >
            <Logo className={styles.logo} />
            <div>поиск</div>
            <Menu />
        </div>
    );
};

export default Sidebar;