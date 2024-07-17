import PropTypes from "prop-types";

function ModalEditRecipeConfirm({ isOpen, onClose, onConfirm }) {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">
            Confirmer les modifications
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Êtes-vous sûr de vouloir enregistrer les modifications ?
          </p>

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
              onClick={onConfirm}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-green-800 hover:bg-green-900 focus:outline-none"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    )
  );
}

ModalEditRecipeConfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ModalEditRecipeConfirm;
