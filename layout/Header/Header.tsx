import React, {
    useEffect,
    useState
} from 'react';
import { HeaderProps } from './Header.props';
import Logo from '../mainlogo.svg';
import { ButtonIcon } from '../../components/ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';
import cn from 'classnames';
import styles from './Header.module.css';

const Header = ({className, ...props}: HeaderProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsOpened(false);
    },[router]);

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: '100%'
        }
    };
    return (
        <header
            className={cn(styles.header, className)}
            {...props}
        >
            <Logo />
            <ButtonIcon appearance='white' icon='menu' onClick={() => setIsOpened(true)}/>
            <motion.div
                className={styles.mobileMenu}
                variants={variants}
                initial='closed'
                animate={isOpened ? 'opened' : 'closed'}
            >
                <Sidebar />
                <ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={() => setIsOpened(false)}/>
            </motion.div>
        </header>
    );
};

export default Header;