import React from 'react';
import {ButtonProps} from "./Button.props";
import ArrowIcon from './Vector.svg';
import styles from './Button.module.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cn = require('classnames');

const Button = ({ appearance, children, arrow = 'none', ...props }:ButtonProps) => {
    return (
        <button
          className={cn(styles.button, {
              [styles.primary]: appearance === 'primary',
              [styles.ghost]: appearance === 'ghost'
          })}
          {...props}
        >
            {children}
            {arrow !== 'none' && (
                <span className={cn(styles.arrow, {
                    [styles.down]: arrow === 'down'
                })}>
                    <ArrowIcon />
                </span>
            )}
        </button>
    );
};

export default Button;