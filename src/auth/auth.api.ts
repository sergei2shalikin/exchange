interface IData {
  login: string;
  password: string;
}

export default async function login<T extends { user: string; token: string }>({ login, password }: IData): Promise<T> {
  const { resolve, reject, promise } = Promise.withResolvers<T>();

  if (login === 'demo' && password == 'demo') {
    resolve({ user: login, token: password } as T);
  } else {
    reject(new Error('Invalid credentials'));
  }

  setTimeout(() => {}, 500)
  return promise
}       
