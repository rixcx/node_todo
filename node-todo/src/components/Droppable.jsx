import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = isOver ? {
    boxShadow: '0 0 20px rgba(184, 184, 184, 0.3)',
    transition: 'all 0.2s ease, transform 0.2s ease',
  } : {
    transition: 'all 0.2s ease, transform 0.2s ease',
  };
  
  return (
    <div ref={setNodeRef} style={style} className={`category category--${props.categoryId}`}>
      {props.children}
    </div>
  );
}
