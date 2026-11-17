import { WpBlock } from '../components/WpBlock';
import { homeBlocks } from '../content/wp-home/blocks';

export default function Home() {
  return (
    <>
      {homeBlocks.map((block) => (
        <WpBlock
          key={block.id}
          html={block.html}
          reveal={block.reveal}
          theme={block.theme}
          label={block.label}
        />
      ))}
    </>
  );
}
