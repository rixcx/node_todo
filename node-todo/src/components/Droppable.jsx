import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = isOver ? {
    color: 'red',
    border: '1px red solid',
    padding: '8px',
  } : {
    border: '1px #333 solid',
    padding: '8px',
  };

  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
