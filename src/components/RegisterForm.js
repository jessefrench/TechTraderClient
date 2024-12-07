'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { editUser, registerUser } from '../api/userData';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  imageUrl: '',
  city: '',
  state: '',
  zip: '',
  isSeller: false,
};

export default function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        imageUrl: user.imageUrl || '',
        email: user.email || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || '',
        isSeller: user.isSeller || false,
        uid: user.uid || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.id) {
        await editUser(formData);
        await updateUser(user.uid);
        router.push('/');
      } else {
        await registerUser(formData);
        await updateUser(user.uid);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-xs space-y-4">
        <h1>Register</h1>

        {/* First Name */}
        <input type="text" placeholder="First name" className="input input-bordered w-full max-w-xs" name="firstName" value={formData.firstName} onChange={handleChange} required />

        {/* Last Name */}
        <input type="text" placeholder="Last name" className="input input-bordered w-full max-w-xs" name="lastName" value={formData.lastName} onChange={handleChange} required />

        {/* Email */}
        <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" name="email" value={formData.email} onChange={handleChange} required />

        {/* Image URL */}
        <input type="url" placeholder="Image URL" className="input input-bordered w-full max-w-xs" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />

        {/* City */}
        <input type="text" placeholder="City" className="input input-bordered w-full max-w-xs" name="city" value={formData.city} onChange={handleChange} required />

        {/* State */}
        <input type="text" placeholder="State" className="input input-bordered w-full max-w-xs" name="state" value={formData.state} onChange={handleChange} required />

        {/* ZIP */}
        <input type="text" placeholder="ZIP" className="input input-bordered w-full max-w-xs" name="zip" value={formData.zip} onChange={handleChange} required />

        {/* Is Seller */}
        <label className="label cursor-pointer">
          <span className="label-text">Register as seller?</span>
          <input
            type="checkbox"
            className="checkbox"
            name="isSeller"
            checked={formData.isSeller}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                isSeller: e.target.checked,
              }))
            }
          />
        </label>

        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    imageUrl: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    isSeller: PropTypes.bool,
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};
