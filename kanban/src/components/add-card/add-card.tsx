import { CardSchema } from '@/utils';
import { PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'motion/react';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

type AddCardProps = {
  column: string;
  setCards: Dispatch<SetStateAction<CardSchema[]>>;
};

export const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState<string>('');
  const [adding, setAdding] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(36).substring(2, 9),
    };

    setCards((cards) => {
      const updatedCards = [...cards, newCard];
      localStorage.setItem('cards', JSON.stringify(updatedCards));
      return updatedCards;
    });

    setText('');
    setAdding(false);
  };

  const handleClose = () => {
    setText('');
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            autoFocus
            placeholder='Add new task...'
            className='w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-zinc-100 placeholder-violet-300 focus:outline-none'
          />
          <div className='mt-1.5 flex items-center justify-end gap-1.5'>
            <button
              className='cursor-pointer px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-100'
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className='flex cursor-pointer gap-1.5 rounded bg-zinc-100 px-3 py-1.5 text-xs text-zinc-900 transition-colors hover:bg-zinc-300'
              type='submit'
            >
              <span>Add</span>
              <PlusIcon className='size-4' />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          className='flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-100'
          onClick={() => setAdding(true)}
        >
          <span>Add card</span>
          <PlusIcon className='size-4' />
        </motion.button>
      )}
    </>
  );
};
