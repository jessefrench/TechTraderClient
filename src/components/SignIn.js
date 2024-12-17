/* eslint-disable @next/next/no-img-element */
import { signIn } from '../utils/auth';

export default function Signin() {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img className="max-w-sm rounded-lg" src="/images/logo.png" alt="logo" style={{ width: '250px', height: '250px' }} />
        <div className="max-w-md">
          <h1 className="text-7xl font-bold">TechTrader</h1>
          <p className="py-6">A friendly marketplace for tech lovers.</p>
          <button className="btn btn-info" type="button" onClick={signIn}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
