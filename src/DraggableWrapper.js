// src/DraggableWrapper.js
import React, { forwardRef } from 'react';
import Draggable from 'react-draggable';

const DraggableWrapper = forwardRef((props, ref) => (
  <Draggable
    nodeRef={ref}
    {...props}
    // Optional: Add grid snapping for smoother movement
    grid={[5, 5]}
    // Optional: Set bounds if needed, e.g., bounds="parent"
    bounds="parent"
  >
    <div ref={ref}>{props.children}</div>
  </Draggable>
));

export default DraggableWrapper;

