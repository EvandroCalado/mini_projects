import { BoardSchema } from '@/components';
import { CardSchema } from '@/utils';
import { Dispatch, SetStateAction, useState } from 'react';

type ColumnProps = {
  column: string;
  boardTitle: string;
  setBoards: React.Dispatch<React.SetStateAction<BoardSchema[]>>;
  cards: CardSchema[];
  setCards: Dispatch<SetStateAction<CardSchema[]>>;
};

export const useBoard = ({
  column,
  boardTitle,
  setBoards,
  cards,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState<boolean>(false);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    card: CardSchema,
  ) => {
    event.dataTransfer.setData('cardId', card.id);
  };

  const highlightIndicator = (event: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const element = getNearestIndicator(event, indicators);

    (element.element as HTMLElement).style.opacity = '1';
  };

  const clearHighlights = (indicators: Element[] = getIndicators()) => {
    indicators.forEach((indicator) => {
      (indicator as HTMLElement).style.opacity = '0';
    });
  };

  const getNearestIndicator = (
    event: React.DragEvent<HTMLDivElement>,
    indicators: Element[],
  ) => {
    const DISTANCE_OFFSET = 50;

    const element = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = event.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },

      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      },
    );

    return element;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    highlightIndicator(event);
    setActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    clearHighlights();
  };

  const handleDragDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActive(false);
    clearHighlights();

    const cardId = event.dataTransfer.getData('cardId');

    const indicator = getIndicators();
    const { element } = getNearestIndicator(event, indicator);

    const before = (element as HTMLElement).dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((card) => card.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((card) => card.id !== cardId);

      const moveToBack = before === '-1';

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((card) => card.id === before);

        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleBoardDelete = () => {
    const filteredBoards = setBoards((boards) =>
      boards.filter((board) => board.title !== boardTitle),
    );

    localStorage.setItem('boards', JSON.stringify(filteredBoards));
  };

  const filteredCards = cards.filter((card) => card.column === column);

  return {
    active,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDragDrop,
    handleBoardDelete,
    filteredCards,
  };
};
