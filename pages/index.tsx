import { useState } from "react";
import Button from "../components/Button/Button";
import { P } from '../components/P/P';
import { Tag } from '../components/Tag/Tag';
import Rating from "../components/Rating/Rating";
import { withLayout } from "../layout/Layout";

function Home(): JSX.Element {
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
    </>
  );
}

export default withLayout(Home);
