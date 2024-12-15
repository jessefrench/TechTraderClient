import { signIn } from '../utils/auth';

export default function Signin() {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] px-8 max-w-sm mx-auto text-center">
      <h1 className="text-2xl font-bold">Hi there!</h1>
      <p className="mt-4">Click the button below to login!</p>
      <button type="button" className="btn btn-primary mt-6" onClick={signIn}>
        Login
      </button>
    </div>
  );
}
