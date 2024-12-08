import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryData';
import getAllConditions from '../api/conditionData';

export default function ListingFilter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [localOnly, setLocalOnly] = useState(false);

  useEffect(() => {
    getAllCategories().then(setCategories);
    getAllConditions().then(setConditions);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => (prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]));
  };

  const handleConditionChange = (conditionId) => {
    setSelectedConditions((prev) => (prev.includes(conditionId) ? prev.filter((id) => id !== conditionId) : [...prev, conditionId]));
  };

  const handleLocationChange = (e) => {
    setLocalOnly(e.target.checked);
  };

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      conditions: selectedConditions,
      localOnly,
    });
  }, [selectedCategories, selectedConditions, localOnly, onFilterChange]);

  return (
    <div className="form-control">
      <h2 className="text-xl font-bold">Category</h2>
      {categories.map((category) => (
        <label className="label cursor-pointer" key={category.id}>
          <span className="label-text">{category.name}</span>
          <input type="checkbox" className="checkbox" onChange={() => handleCategoryChange(category.id)} />
        </label>
      ))}

      <h2 className="text-xl font-bold mt-8">Condition</h2>
      {conditions.map((condition) => (
        <label className="label cursor-pointer" key={condition.id}>
          <span className="label-text">{condition.name}</span>
          <input type="checkbox" className="checkbox" onChange={() => handleConditionChange(condition.id)} />
        </label>
      ))}

      <h2 className="text-xl font-bold mt-8">Location</h2>
      <label className="label cursor-pointer">
        <span className="label-text">Local listings only</span>
        <input type="checkbox" className="checkbox" onChange={handleLocationChange} />
      </label>
    </div>
  );
}

ListingFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};
