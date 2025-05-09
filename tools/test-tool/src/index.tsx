import React, { useState } from 'react';

const Tool: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Tool</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This is a test tool created from the template. It includes a simple counter to demonstrate interactivity.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            -
          </button>
          <span className="text-xl font-bold">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tool; 