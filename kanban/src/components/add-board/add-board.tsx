import { FormEvent, useState } from 'react';
import { BoardSchema } from '../kanban/kanban';

type AddCardProps = {
  setBoards: React.Dispatch<React.SetStateAction<BoardSchema[]>>;
};

export const AddBoard = ({ setBoards }: AddCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>('#ffffff');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBoard = {
      title,
      column: title,
      headingColor: color,
    };

    setBoards((boards) => [...boards, newBoard]);

    localStorage.setItem(
      'boards',
      JSON.stringify([
        ...JSON.parse(localStorage.getItem('boards') || '[]'),
        newBoard,
      ]),
    );

    setShowModal(false);
    setTitle('');
    setColor('#ffffff');
  };

  return (
    <>
      <button
        className='mt-10 cursor-pointer rounded border border-zinc-500 bg-zinc-500/20 px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-zinc-500/30'
        type='button'
        onClick={() => setShowModal(true)}
      >
        Add Board
      </button>

      {showModal && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/50'>
          <form
            onSubmit={handleSubmit}
            className='flex w-full max-w-sm flex-col gap-4 rounded-xl border border-zinc-500 bg-zinc-500/20 p-5'
          >
            <div className='relative -mx-5 -mt-5 flex items-center justify-center border-b border-zinc-500 p-5'>
              <h2>Adicionar Board</h2>
              <button
                type='button'
                className='absolute top-5 right-5 cursor-pointer'
                onClick={() => {
                  setShowModal(false);
                  setTitle('');
                  setColor('#ffffff');
                }}
              >
                X
              </button>
            </div>

            <div className='my-5 flex gap-2'>
              <input
                type='text'
                placeholder='Título'
                value={title}
                onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
                className='w-full rounded border border-zinc-500 p-1.5 outline-none focus:border-zinc-100'
              />
              <input
                type='color'
                name='color'
                id='color'
                placeholder='Cor'
                value={color}
                onChange={(e) => setColor((e.target as HTMLInputElement).value)}
                className='h-[38px] cursor-pointer rounded border border-zinc-500 outline-none focus:border-zinc-100'
              />
            </div>

            <button
              type='submit'
              className='cursor-pointer rounded bg-zinc-500/30 px-3 py-1.5 text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-500/40'
            >
              Salvar
            </button>
          </form>
        </div>
      )}
    </>
  );
};
