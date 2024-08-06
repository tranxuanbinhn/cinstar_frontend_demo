// src/Arrow.js
import './slider.css';
import React from 'react';
import './slider.css';

const Arrow = ({ className, style, onClick, direction }) => (
  <div
    className={className}
    style={{ ...style, display: "block", background: "rgba(0, 0, 0, 0.5)" }}
    onClick={onClick}
  >
   
  </div>
);

export default Arrow;
