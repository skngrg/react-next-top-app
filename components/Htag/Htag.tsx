import { HtagProps } from "./Htag.props";
import styles from './Htag.module.css';

export const Htag = ({tag, children}:HtagProps): JSX.Element => {
    const COMPONENT = tag;
    return <COMPONENT className={styles[`${COMPONENT}`]}>{children}</COMPONENT>
}