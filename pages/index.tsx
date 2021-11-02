import {Htag} from "../components/Htag/Htag";
import Button from "../components/Button/Button";
import { P } from '../components/P/P';
import { Tag } from '../components/Tag/Tag';

export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag={'h1'}>fwdvqdw</Htag>
        <Button appearance={'primary'} arrow={'right'}>primary</Button>
        <Button appearance={'ghost'}>ghost</Button>
      <P size={'l'}>Большой</P>
      <P size={'m'}>Средний</P>
      <P size={'s'}>Маленький</P>
      <Tag size={'s'}>Small</Tag>
      <Tag size={'m'} color={'red'}>Red</Tag>
      <Tag size={'s'} color={'green'}>Green</Tag>
    </div>
  );
}
