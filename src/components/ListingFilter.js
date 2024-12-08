import { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryData';
import getAllConditions from '../api/conditionData';

export default function ListingFilter() {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);

  const getCategories = () => {
    getAllCategories().then(setCategories);
  };

  const getConditions = () => {
    getAllConditions().then(setConditions);
  };

  useEffect(() => {
    getCategories();
    getConditions();
  }, []);

  return (
    <div className="form-control">
      <h2>Category</h2>
      {categories.map((category) => (
        <label className="label cursor-pointer" key={category.id}>
          <span className="label-text">{category.name}</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      ))}

      <h2>Condition</h2>
      {conditions.map((condition) => (
        <label className="label cursor-pointer" key={condition.id}>
          <span className="label-text">{condition.name}</span>
          <input type="checkbox" defaultChecked className="checkbox" />
        </label>
      ))}
    </div>
  );
}
