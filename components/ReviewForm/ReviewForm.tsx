import React, { useState } from 'react';
import axios from 'axios';
import { ReviewFormProps } from './ReviewForm.props';
import { API } from '../../helpers/api';
import { Input } from '../Input/Input';
import Rating from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import Button from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import {
    IReviewForm,
    IReviewSentResponse
} from './ReviewForm.interface';

import cn from 'classnames';
import styles from './ReviewForm.module.css';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div
                className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input
                    {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                    error={errors.name}
                    placeholder='Имя'
                />
                <Input
                    {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                    error={errors.title}
                    placeholder='Заголовок отзыва'
                    className={styles.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                        render={({ field }) => (
                            <Rating
                                isEditable
                                rating={field.value}
                                ref={field.ref}
                                setRating={field.onChange}
                                error={errors.rating}
                            />
                        )}
                    />
                </div>
                <TextArea
                    {...register('description', { required: { value: true, message: 'Заполните описание' } })}
                    error={errors.description}
                    placeholder='Текст отзыва'
                    className={styles.description}
                />
                <div className={styles.submit}>
                    <Button appearance='primary'>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && (
                <div className={cn(styles.panel, styles.success)}>
                    <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                    <div>
                        Спасибо, ваш отзыв будет опубликован после проверки
                    </div>
                    <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
                </div>
            )}
            {error && (
                <div className={cn(styles.panel, styles.error)}>
                    Что-то пошло не так. Попробуйте обновить страницу
                    <CloseIcon className={styles.close} onClick={() => setError(undefined)}/>
                </div>
            )}
        </form>
    );
};