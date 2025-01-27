import { DropIndicator } from '@/components';
import { CardSchema } from '@/utils';
import { motion } from 'motion/react';

type CardProps = {
  card: CardSchema;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    card: CardSchema,
  ) => void;
};

export const Card = ({ card, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={card.id} column={card.column} />
      <motion.div
        layout
        layoutId={card.id}
        draggable
        onDragStart={(event) =>
          handleDragStart(
            event as unknown as React.DragEvent<HTMLDivElement>,
            card,
          )
        }
        className='cursor-grab rounded border border-zinc-700 bg-zinc-800 p-3 active:cursor-grabbing'
      >
        <h3>{card.title}</h3>
      </motion.div>
    </>
  );
};
