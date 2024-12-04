import PropTypes from 'prop-types';
import { useAuth } from '@/utils/context/authContext';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/navigation';

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading, registrationComplete } = useAuth();
  const router = useRouter();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    // Redirect to the registration page if the user hasn't completed registration
    if (!registrationComplete) {
      router.push('/register'); // Ensure this matches your registration page route
      return null; // Avoid rendering anything during the redirect
    }

    // Render authenticated user view
    return (
      <>
        <NavBar />
        {children}
      </>
    );
  }

  // Render the sign-in view for unauthenticated users
  return <SignIn />;
}

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};
