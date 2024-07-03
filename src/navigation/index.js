import React from 'react';
import {AuthenticationProvider} from '../context/Authentication';
import Navigator from './Navigator';
import { UserContext, UserProvider } from '../context/UserProvider';
import { ServicoProvider } from '../context/ServicoProvider';



export default function Providers() {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <ServicoProvider>
          <Navigator />
        </ServicoProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
}