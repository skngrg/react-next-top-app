import React, {
    useEffect,
    useState,
    KeyboardEvent,
    forwardRef,
    ForwardedRef
} from 'react';
import { RatingProps } from "./Rating.props";

import StarIcon from './star.svg';
import styles from './Rating.module.css';
import cn from 'classnames';

const Rating = forwardRef(({ error, isEditable = false, rating, setRating, className, ...props }:RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element  => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
    },[rating])

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r:JSX.Element, index: number) => {
            return (
                <span
                    className={cn(styles.star, {
                        [styles.filled]: index < currentRating,
                        [styles.editable]: isEditable
                    })}
                    onMouseEnter={() => changeDisplay(index + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(index + 1)}
                >
                    <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e:KeyboardEvent<SVGElement>) => isEditable && handleSpace(index + 1, e)}
                    />
                </span>
            );
        });
        setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
        if(!isEditable) {
            return;
        }
        constructRating(i);
    };

    const onClick = (i: number) => {
        if(!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if(e.code !== 'Space' || !setRating) {
            return;
        }
        setRating(i);
    };

    return (
        <div ref={ref} {...props} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});

export default Rating;