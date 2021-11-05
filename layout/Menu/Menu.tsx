import React, { useContext } from 'react';

import styles from './Menu.module.css';
import { AppContext } from "../../context/app.context";

const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    return (
        <ul>
            {menu.map(m => <li key={m._id.secondCategory}>{m._id.secondCategory}</li>)}
        </ul>
    );
};

export default Menu;