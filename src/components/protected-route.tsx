import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { ROUTES } from '../routes';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
}
