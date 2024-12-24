import { createContext } from 'react';

interface IAuthContext {
  user: string;
  token: string;
  signin: ({ login, password }: { login: string; password: string }) =>
    Promise<void>;
  signout: () => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
