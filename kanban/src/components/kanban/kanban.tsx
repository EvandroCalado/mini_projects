import { AddBoard, Board, BurnBarrel } from '@/components';
import { CardSchema } from '@/utils';
import { useEffect, useState } from 'react';

export type BoardSchema = {
  title: string;
  column: string;
  headingColor: string;
};

export const Kanban = () => {
  const [boards, setBoards] = useState<BoardSchema[]>([]);
  const [cards, setCards] = useState<CardSchema[]>([]);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem('cards', JSON.stringify(cards));
      localStorage.setItem('boards', JSON.stringify(boards));
    }
  }, [boards, cards, hasChecked]);

  useEffect(() => {
    const cardsStored = localStorage.getItem('cards');
    const boardsStored = localStorage.getItem('boards');

    if (cardsStored) {
      setCards(JSON.parse(cardsStored));
      setHasChecked(true);
    }

    if (boardsStored) {
      setBoards(JSON.parse(boardsStored));
      setHasChecked(true);
    }
  }, []);

  return (
    <div className='flex h-full w-full gap-3 overflow-scroll p-5'>
      {boards.map((board) => (
        <Board
          key={`${board.title}-${board.headingColor}`}
          title={board.title}
          column={board.column}
          headingColor={board.headingColor}
          boardTitle={board.title}
          setBoards={setBoards}
          cards={cards}
          setCards={setCards}
        />
      ))}

      <div className='ml-auto'>
        <AddBoard setBoards={setBoards} />
        <BurnBarrel setCards={setCards} />
      </div>
    </div>
  );
};
