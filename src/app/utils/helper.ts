import { NextResponse } from 'next/server';

export const getErrorResponse = (status: number = 500, message: string) => {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? 'fail' : 'error',
      message,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
