'use client';

import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(3);

  const throwCounterClickHandler = (e: any) => {
    e.preventDefault();
    setCount(count - 1);
  };

  if (count <= 0) {
    throw new Error('Counter threw an error!');
  }

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>
        <button
          onClick={(e) => throwCounterClickHandler(e)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = '#005bb5')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = '#0070f3')
          }
        >
          Throw Error in {count} clicks.
        </button>
      </div>
    </main>
  );
}
