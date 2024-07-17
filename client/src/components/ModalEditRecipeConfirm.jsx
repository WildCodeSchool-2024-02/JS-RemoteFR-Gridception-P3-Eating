// export default function ModalEditRecipeConfirm({ isOpen, onClose, onConfirm }) {
//   return (
//     <div className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}>
//       <div className="flex items-center justify-center min-h-full p-4 text-center">
//         <div
//           className="fixed inset-0 bg-black bg-opacity-25"
//           onClick={onClose}
//           role="button"
//           tabIndex={0}
//         ></div>
//         <div className="relative z-10 p-6 bg-white max-w-md mx-auto rounded-lg shadow-xl">
//           <h3 className="text-lg font-medium leading-6 text-gray-900">
//             Confirmer les modifications
//           </h3>
//           <p className="mt-2 text-sm text-gray-500">
//             Êtes-vous sûr de vouloir enregistrer les modifications ?
//           </p>
//           <div className="mt-4 flex justify-end">
//             <button
//               onClick={onConfirm}
//               className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-md hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
//             >
//               Confirmer
//             </button>
//             <button
//               onClick={onClose}
//               className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
//             >
//               Annuler
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
