import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import CreateAccount from './routes/create-account';
import LoadingScreen from './components/loading-screen';

import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { ROUTES } from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.CREATE_ACCOUNT,
    element: <CreateAccount />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.HOME} replace />,
  },
]);

const GlobalStyle = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', 
    sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
