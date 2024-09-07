// src/DraggableWrapper.js
import React, { forwardRef } from 'react';
import  Draggable  from 'react-draggable';

const DraggableWrapper = forwardRef((props, ref) => (
  <Draggable nodeRef={ref} {...props}>
    <div ref={ref}>{props.children}</div>
  </Draggable>
));

export default DraggableWrapper;

