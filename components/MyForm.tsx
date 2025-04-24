import React, { FormEvent, useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event : FormEvent<HTMLFormElement>) {
    console.log(`${value}`)
    event.preventDefault();
    setIsLoading(true);
    socket.timeout(5000).emit('message', value, () => {
      setIsLoading(false);
    });
  }

  return (
    <form onSubmit={ onSubmit }>
      <input className='text-red-500' onChange={ e => setValue(e.target.value) } />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
  );
}