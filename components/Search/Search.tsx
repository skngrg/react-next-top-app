import React, { useState, KeyboardEvent } from 'react';
import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';
import Button from '../Button/Button';
import GlassIcon from './glass.svg';
import cn from 'classnames';
import styles from './Search.module.css';
import { useRouter } from 'next/router';


export const Search = ({className, ...props}: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter();
    const goToSearch = () => {
        router.push({
            pathname: '/search',
           query: {
                q: search
           }
        });
    };

    const handlKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            goToSearch();
        }
    };

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input
                placeholder='Поиск...'
                className={styles.input}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handlKeyDown}
            />
            <Button
                appearance='primary'
                className={styles.button}
                onClick={goToSearch}
            >
                <GlassIcon />
            </Button>
        </div>
    );
};