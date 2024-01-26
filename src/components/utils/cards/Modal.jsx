// Modal.js
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose }) => {
  const modalClass = isOpen ? 'block' : 'hidden';

  const handleOverlayClick = (e) => {
    // Check if the click target is the overlay (outside modal content)
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed overflow-hidden top-0 z-40 left-0 w-full h-full bg-gray-800 bg-opacity-50 ${modalClass}`}
      onClick={handleOverlayClick}
    >
      <div className="fixed top-[4.5rem] left-1/2 transform -translate-x-1/2  bg-white px-3 py-5 w-[40%] border-[white] border-b-2 text-black rounded shadow-lg max-lg:w-[60%] max-md:w-[80%] max-sm:w-[100%]">
        <div className="flex justify-between">
          <p className="text-xl font-bold mb-4">At your first sign in</p>
          <button
            className="bg-blue-700 text-white font-bold px-4 py-2 rounded hover:bg-blue-500 focus:outline-none"
            onClick={onClose}
          >
            &#x2715;
          </button>
        </div>

        <Link to="/signup">
          <input
            type="submit"
            className="rounded w-[100%] mt-5 bg-blue-700 text-white py-2 hover:text-[] cursor-pointer"
            value={'At first Sign in your account'}
          />
        </Link>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
