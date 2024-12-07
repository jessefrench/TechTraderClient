import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
import RegisterForm from '../../components/RegisterForm';

export default function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading, updateUser } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // if user is logged in but not registered, show RegisterForm
  if (user && !user.id) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <RegisterForm user={user} updateUser={updateUser} />
      </div>
    );
  }

  // if user is fully registered, show NavBar and the rest of the app
  if (user && user.id) {
    return (
      <>
        <NavBar />
        {children}
      </>
    );
  }

  // if not logged in, show SignIn
  return <SignIn />;
}

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
