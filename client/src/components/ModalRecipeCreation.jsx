import { useState } from "react";
import PropTypes from "prop-types";

function ModalRecipeCreation({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [setQuantity] = useState("");

  const handleSave = () => {
    onSave({ name, calories });
    setName("");
    setCalories("");
    setQuantity("");
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">
            Ajouter un nouvel ingrédient
          </h2>
          <div className="mb-4">
            <label
              htmlFor="ingredientName"
              className="block text-xl font-semibold text-gray-700"
            >
              Nom
            </label>
            <input
              id="ingredientName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="ingredientCalories"
              className="block text-xl font-semibold text-gray-700"
            >
              Calories
            </label>
            <input
              id="ingredientCalories"
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-800 focus:border-green-800 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    )
  );
}

ModalRecipeCreation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ModalRecipeCreation;
