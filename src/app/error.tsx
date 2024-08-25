'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ky from 'ky';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const pathName = usePathname();
  const [isHttpRequestSuccess, setIsHttpRequestSuccess] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const reportError = async () => {
      try {
        await ky.post('/api/slack', {
          json: {
            location: pathName,
            message: error.message,
          },
        });
        setIsHttpRequestSuccess(true);
      } catch (err) {
        setIsHttpRequestSuccess(false);
      }
    };

    reportError();
  }, [error.message, pathName]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#ff4d4f' }}>
        ERROR Page
      </h2>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Something went wrong at <strong>{pathName}</strong>.
        <br />
        The error has been reported.
      </p>
      {isHttpRequestSuccess === true && (
        <p style={{ color: 'green', marginBottom: '20px' }}>
          The error report was successfully sent.
        </p>
      )}
      {isHttpRequestSuccess === false && (
        <p style={{ color: 'red', marginBottom: '20px' }}>
          Failed to send the error report. Please try again later.
        </p>
      )}
      <button
        onClick={() => reset()}
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
        GO TO HOME
      </button>
    </div>
  );
}
