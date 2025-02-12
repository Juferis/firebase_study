import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { ROUTES } from '../routes';

export default function Home() {
  const navigate = useNavigate();

  const logOut = async () => {
    await auth.signOut();
    navigate(ROUTES.LOGIN);
  };
  return (
    <h1>
      <button onClick={logOut}>Log Out</button>
    </h1>
  );
}
