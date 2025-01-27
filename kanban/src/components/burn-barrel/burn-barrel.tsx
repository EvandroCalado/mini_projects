import { CardSchema } from '@/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';

type BurnBarrelProps = {
  setCards: Dispatch<SetStateAction<CardSchema[]>>;
};

export const BurnBarrel = ({ setCards }: BurnBarrelProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('cardId');

    setCards((cards) => cards.filter((card) => card.id !== cardId));
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active ? 'border-red-800 bg-red-800/20 text-red-500' : 'border-zinc-500 bg-zinc-500/20 text-zinc-500'}`}
    >
      {active ? (
        <FireIcon className='pointer-events-none size-10 animate-bounce' />
      ) : (
        <TrashIcon className='pointer-events-none size-10' />
      )}
    </div>
  );
};
