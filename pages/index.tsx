import { useState } from "react";
import Button from "../components/Button/Button";
import { P } from '../components/P/P';
import { Tag } from '../components/Tag/Tag';
import Rating from "../components/Rating/Rating";
import { withLayout } from "../layout/Layout";
import { GetStaticProps } from "next";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import {
    Input,
    TextArea
} from '../components';

function Home({ menu }:HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Button appearance={'ghost'}>ghost</Button>
      <P size={'l'}>Большой</P>
      <P size={'m'}>Средний</P>
      <P size={'s'}>Маленький</P>
      <Tag size={'s'}>Small</Tag>
      <Tag size={'m'} color={'red'}>Red</Tag>
      <Tag size={'s'} color={'green'}>Green</Tag>
      <Rating rating={rating} isEditable={true} setRating={setRating} />
        {menu.map(m => {
            return <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        })}
      <Input placeholder={'test'}/>
      <TextArea />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find/', { firstCategory });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[];
    firstCategory: number;
}
