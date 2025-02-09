/* eslint-disable @next/next/no-img-element */

'use client';

import { useAuth } from '@/utils/context/authContext';
import Link from 'next/link';
import { FaArrowRightFromBracket, FaBookmark, FaCircleUser, FaComments, FaFileCirclePlus } from 'react-icons/fa6';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue !== '') router.push(`/listings/search/${searchValue}`);
    setSearchValue('');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link passHref href="/">
          <p className="btn btn-ghost text-xl">
            <img className="w-10" alt="TechTrader Logo" src="/images/logo.png" />
            TechTrader
          </p>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" onChange={handleChange} value={searchValue} />
          </form>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="User Profile" src={user.imageUrl} />
            </div>
          </div>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link passHref href="/messages">
                <p className="flex items-center gap-2">
                  <FaComments /> Messages
                </p>
              </Link>
            </li>
            <li>
              <Link passHref href="/listings/new">
                <p className="flex items-center gap-2">
                  <FaFileCirclePlus /> Create listing
                </p>
              </Link>
            </li>
            <li>
              <Link passHref href="/listings/saved">
                <p className="flex items-center gap-2">
                  <FaBookmark /> Saved listings
                </p>
              </Link>
            </li>
            <li>
              <Link passHref href="/listings/my-listings">
                <p className="flex items-center gap-2">
                  <FaCircleUser /> My listings
                </p>
              </Link>
            </li>
            <li>
              <button type="button" onClick={signOut}>
                <FaArrowRightFromBracket /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
