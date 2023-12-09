/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { PropsWithChildren } from '../../../types/utilityTypes';

function Button({
  children,
  type,
  disabled,
  ...attributes
}: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  const classNameByStatus = disabled
    ? 'bg-slate-300 pointer-events-none'
    : 'bg-blue-500 hover:bg-blue-700';
  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded select-none ${classNameByStatus}`}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Button;
