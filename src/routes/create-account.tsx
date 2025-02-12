import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

export default function CreatAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') setPassword(value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    if (isLoading || name === '' || email === '' || password === '') return;

    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
      <Title>Join My SNS</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          value={name}
          placeholder="name"
          type="text"
          required
          onChange={onChange}
        />
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
        <Input
          type="submit"
          value={isLoading ? 'Loading...' : 'Create Account'}
        />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        이미 계정이 이으신가요?
        <Link to={ROUTES.LOGIN}>로그인하기 &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
