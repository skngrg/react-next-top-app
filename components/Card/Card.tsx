import React from 'react';
import { CardProps } from './Card.props';
import cn from 'classnames';
import styles from './Card.module.css';

export const Card = ({ color = 'white', children, className, ...props }: CardProps) => {
    return (
        <div
            className={cn(styles.card, className, {
            [styles.blue]: color === 'blue'
            })}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;