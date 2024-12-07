'use client';

import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getAllCategories } from '../../api/categoryData';
import { createListing, updateListing } from '../../api/listingData';
import getAllConditions from '../../api/conditionData';

const initialState = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  sold: false,
};

export default function ListingForm({ listing }) {
  const [formData, setFormData] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const getCategories = () => {
    getAllCategories().then(setCategories);
  };

  const getConditions = () => {
    getAllConditions().then(setConditions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (listing?.id) {
      updateListing(listing.id, { ...formData, sellerId: user.id }).then(() => {
        router.push(`/listings/${listing.id}`);
      });
    } else {
      createListing({
        ...formData,
        sellerId: user.id,
        createdOn: new Date(),
      }).then(({ id }) => {
        router.push(`/listings/${id}`);
      });
    }
  };

  useEffect(() => {
    getCategories();
    getConditions();
    if (listing?.id) {
      setFormData({ ...listing, categoryId: listing.category.id, conditionId: listing.condition.id });
    }
  }, [listing]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control w-full max-w-xs space-y-4">
        <h1>{listing?.id ? 'Update' : 'Create'} Listing</h1>

        {/* Name */}
        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" name="name" value={formData.name} onChange={handleChange} required />

        {/* Description */}
        <textarea type="text" placeholder="Description" className="textarea textarea-bordered" name="description" value={formData.description} onChange={handleChange} required />

        {/* Price */}
        <input type="text" placeholder="Price" className="input input-bordered w-full max-w-xs" name="price" value={formData.price} onChange={handleChange} required />

        {/* Image URL */}
        <input type="url" placeholder="Image URL" className="input input-bordered w-full max-w-xs" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />

        {/* Category Select */}
        <select className="select select-bordered w-full max-w-xs" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Condition Select */}
        <select className="select select-bordered w-full max-w-xs" name="conditionId" value={formData.conditionId} onChange={handleChange} required>
          <option value="">Select a condition</option>
          {conditions.map((condition) => (
            <option key={condition.id} value={condition.id}>
              {condition.name}
            </option>
          ))}
        </select>

        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
}

ListingForm.propTypes = {
  listing: PropTypes.shape({
    id: PropTypes.number,
    sellerId: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    createdOn: PropTypes.instanceOf(Date),
    sold: PropTypes.bool,
    category: PropTypes.shape({
      id: PropTypes.number,
    }),
    condition: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};
