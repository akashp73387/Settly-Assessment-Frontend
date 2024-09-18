import React from "react";

const Modal = ({ formData, handleChange, handleEditSubmit, closeModal, errors, editHistory }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl mb-4 text-indigo-400 uppercase font-semibold">
          Edit User Details
        </h2>
        <form onSubmit={handleEditSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Age Input */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">Age:</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Department Input */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              Department:
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              Employee Status:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Status</option>
              <option value="Remote">Remote</option>
              <option value="Contract Employee">Contract Employee</option>
              <option value="Full Time">Full Time</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Edit History */}
        {editHistory.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-300">
              Edit History
            </h3>
            <ul className="mt-2 space-y-2">
              {editHistory.map((entry, index) => (
                <li key={index} className="border-b border-gray-600 py-2">
                  <div className="text-white">
                    <strong>Changes:</strong> {JSON.stringify(entry.changes)}
                  </div>
                  <div className="text-gray-400">
                    <strong>Timestamp:</strong> {entry.timestamp}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;


// redux ,contet api,promises,mongodb,restapi