import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { styled } from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

const Button = styled.button`
  margin-top: 50px;
  display: flex;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      // TODO: 모바일 환경과 웹 환경 구분해서 적용
      await signInWithPopup(auth, provider);
      //   await signInWithRedirect(auth, provider);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg" />
      Continue with Github
    </Button>
  );
}
