import React from 'react';
import { TextAreaProps } from './TextArea.props';

import cn from 'classnames';
import styles from './TextArea.module.css';

export const TextArea = ({className, ...props}: TextAreaProps): JSX.Element => {
    return <textarea className={cn(className, styles.input)} {...props} />;
};