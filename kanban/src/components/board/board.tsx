import { AddCard, BoardSchema, Card, DropIndicator } from '@/components';
import { useBoard } from '@/hooks';
import { CardSchema } from '@/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';

type ColumnProps = {
  title: string;
  headingColor: string;
  column: string;
  boardTitle: string;
  setBoards: React.Dispatch<React.SetStateAction<BoardSchema[]>>;
  cards: CardSchema[];
  setCards: Dispatch<SetStateAction<CardSchema[]>>;
};

export const Board = ({
  title,
  headingColor,
  column,
  boardTitle,
  setBoards,
  cards,
  setCards,
}: ColumnProps) => {
  const {
    active,
    filteredCards,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
    handleDragStart,
    handleBoardDelete,
  } = useBoard({ column, boardTitle, setBoards, cards, setCards });

  return (
    <div className='w-sm shrink-0'>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragDrop}
        className={`${active ? 'bg-zinc-800/50' : 'bg-zinc-800/20'} h-full w-full rounded-md p-2 transition-colors`}
      >
        <div className='mb-3 flex items-center justify-between'>
          <h3 style={{ color: headingColor }} className={`text-lg font-medium`}>
            {title}
          </h3>
          <button
            className='cursor-pointer text-zinc-400 transition-colors hover:text-zinc-500'
            onClick={handleBoardDelete}
          >
            <TrashIcon className='pointer-events-none size-5' />
          </button>
        </div>

        {filteredCards.map((card) => (
          <Card key={card.id} card={card} handleDragStart={handleDragStart} />
        ))}

        <DropIndicator beforeId='-1' column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};
