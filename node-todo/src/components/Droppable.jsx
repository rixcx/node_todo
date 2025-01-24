import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = isOver ? {
    background: '#c9d3e3',
    boxShadow: '0 0 8px rgba(131, 130, 148, 0.25)',
    transition: 'all 0.2s ease, transform 0.2s ease'
  } : {
    transition: 'all 0.2s ease, transform 0.2s ease'
  };
  
  return (
    <div ref={setNodeRef} style={style} className="category">
      {props.children}
    </div>
  );
}
