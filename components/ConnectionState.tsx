import React from 'react';
import { PlugZap } from 'lucide-react';
import { Button } from './ui/button';
type Props = {
  isConnected: boolean;
};
export function ConnectionState({ isConnected }: Props) {

  return <Button className={`${
    isConnected
      ? 'bg-green-500  dark:bg-green-500'
      : 'bg-red-500  dark:bg-red-500'
  }`}> <PlugZap></PlugZap>  </Button> 
}