import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { FirebaseError } from 'firebase/app';
import { FIREBASE_ERROR_MESSAGE, NOT_FOUND_ERROR } from '../constant';
import {
  Input,
  Switcher,
  Title,
  Wrapper,
  Error,
  Form,
} from '../components/auth-components';
import GithubButton from '../components/github-btn';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') setPassword(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    if (isLoading || email === '' || password === '') return;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(FIREBASE_ERROR_MESSAGE[e.code] || NOT_FOUND_ERROR);
      } else {
        setError(NOT_FOUND_ERROR);
      }
    } finally {
      setIsLoading(false);
      navigate(ROUTES.HOME);
    }
  };

  return (
    <Wrapper>
      <Title>Log in PETTHER</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
          onChange={onChange}
        />
        <Input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
          onChange={onChange}
        />
        <Input type="submit" value={isLoading ? 'Loading...' : 'Log in'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        {'계정이 없으신가요? '}
        <Link to={ROUTES.CREATE_ACCOUNT}>가입하기 &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
