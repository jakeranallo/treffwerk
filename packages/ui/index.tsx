import * as React from 'react';

export interface UIProps {
  children?: React.ReactNode;
}

export const UI: React.FC<UIProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default UI; 