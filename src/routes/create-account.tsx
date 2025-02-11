import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Title = styled.h1``;
const Form = styled.form``;
const Input = styled.input``;

export default function CreatAccount() {
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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name, email, password);
    try {
      // TODO: create an account
      // TODO: set the name of the user
      // TODO: Redirect to the home page
    } catch (e) {
      // TODO: set error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Login My SNS</Title>
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
        {isLoading ? (
          'Loading...'
        ) : (
          <Input type="submit" value="Create Account" />
        )}
      </Form>
    </Wrapper>
  );
}
