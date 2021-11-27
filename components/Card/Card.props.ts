import {
    DetailedHTMLProps,
    HTMLAttributes,
    ReactNode
} from 'react';

export interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    hover?: 'white' | 'blue';
    children: ReactNode;
}