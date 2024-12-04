'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

const initalState = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  city: '',
  state: '',
  zip: '',
  isSeller: false,
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({ initalState });
  const { setRegistrationComplete } = useAuth();
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createRegisteredUser = () => {
      const payload = { ...formData, uid: user.uid };
      registerUser(payload).then(() => {
        setRegistrationComplete(true);
        router.push('/');
      });
    };
    createRegisteredUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-xs space-y-4">
        <h1>Register</h1>

        {/* first name */}
        <input type="text" placeholder="First name" className="input input-bordered w-full max-w-xs" name="firstName" value={formData.firstName} onChange={handleChange} required />

        {/* last name */}
        <input type="text" placeholder="Last name" className="input input-bordered w-full max-w-xs" name="lastName" value={formData.lastName} onChange={handleChange} required />

        {/* email */}
        <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" name="email" value={formData.email} onChange={handleChange} required />

        {/* image */}
        <input type="url" placeholder="Image URL" className="input input-bordered w-full max-w-xs" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />

        {/* city */}
        <input type="text" placeholder="City" className="input input-bordered w-full max-w-xs" name="city" value={formData.city} onChange={handleChange} required />

        {/* state */}
        <input type="text" placeholder="State" className="input input-bordered w-full max-w-xs" name="state" value={formData.state} onChange={handleChange} required />

        {/* zip */}
        <input type="text" placeholder="ZIP" className="input input-bordered w-full max-w-xs" name="zip" value={formData.zip} onChange={handleChange} required />

        {/* isSeller */}
        <label className="label cursor-pointer">
          <span className="label-text">Register as seller?</span>
          <input
            type="checkbox"
            className="checkbox"
            name="isSeller"
            checked={formData.isSeller}
            onChange={(e) => {
              setFormData((prevState) => ({
                ...prevState,
                isSeller: e.target.checked,
              }));
            }}
          />
        </label>

        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
}
