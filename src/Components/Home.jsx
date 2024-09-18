import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, updateUserData, clearPreviousValues, addEditHistory, setEditHistory} from "../Redux/Slice";
import Modal from "./Modal";

const MyForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.data.userData);  
  const editHistory = useSelector((state) => state.data.editHistory);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    department: "",
    status: "",
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    try {
      const userResponse = await fetch(
        "https://settly-assessment-backend.onrender.com/api/users/getAllusers"
      );
      const data = await userResponse.json();
      dispatch(setUserData(data));

      // Fetch edit history for each user
      data.forEach(async (user) => {
        const historyResponse = await fetch(
          `https://settly-assessment-backend.onrender.com/api/users/getEditHistory/${user._id}`
        );
        const historyData = await historyResponse.json();
        dispatch(setEditHistory({ userId: user._id, history: historyData }));
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (!formData.age) {
      errors.age = "Age is required";
    }
    if (!formData.department) {
      errors.department = "Department is required";
    }
    if (!formData.status) {
      errors.status = "Status is required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      fetch(
        "https://settly-assessment-backend.onrender.com/api/users/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((response) => response.json())
        .then(() => {
          alert("Form Submitted successfully");
          fetchData();
        })
        .catch((error) => console.error("Error submitting form:", error));
    } else {
      setErrors(validationErrors);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(userData[index]);
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const updatedUser = { ...formData };
      const userId = userData[editIndex]._id;
  
      try {
        const response = await fetch(
          `https://settly-assessment-backend.onrender.com/api/users/editUser/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );
  
        if (response.ok) {
          dispatch(updateUserData({ index: editIndex, updatedUser }));
  
          await fetch(
            "https://settly-assessment-backend.onrender.com/api/users/addEditHistory",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId,
                changes: formData,
                timestamp: new Date().toLocaleString(),
              }),
            }
          );
  
          dispatch(addEditHistory({
            userId,
            changes: formData,
            timestamp: new Date().toLocaleString()
          }));
  
          setFormData({
            name: "",
            address: "",
            age: "",
            department: "",
            status: "",
          });
          setErrors({});
          alert("User Data edited successfully");
          setIsModalOpen(false);
        } else {
          const errorData = await response.json();
          alert(`Failed to update user: ${errorData.message}`);
        }
      } catch (error) {
        alert(`Failed to update user: ${error.message}`);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-900 p-5">
      {/* Form Container */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-2/5 mx-auto my-10">
        <h1 className="text-3xl text-center text-indigo-400 p-2">Form</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-700 p-6 rounded-lg shadow-lg space-y-4"
        >
          <div>
            <label className="block text-gray-300 font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-300"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">Age:</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-300"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">
              Department:
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-300"
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">
              Employee Status:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-500 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-gray-900 text-gray-300"
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

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Table Container */}
      <div className="mt-24 overflow-x-auto">
        <h1 className="text-3xl text-center text-indigo-400 pb-5">
          Table Data
        </h1>
        <table className="min-w-full bg-gray-800 border border-gray-600 shadow-md">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="py-2 px-4 border-b border-gray-600">Emp_ID</th>
              <th className="py-2 px-4 border-b border-gray-600">Name</th>
              <th className="py-2 px-4 border-b border-gray-600">Address</th>
              <th className="py-2 px-4 border-b border-gray-600">Age</th>
              <th className="py-2 px-4 border-b border-gray-600">Department</th>
              <th className="py-2 px-4 border-b border-gray-600">Status</th>
              <th className="py-2 px-4 border-b border-gray-600">Created At</th>
              <th className="py-2 px-4 border-b border-gray-600">Edited At</th>
              <th className="py-2 px-4 border-b border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center text-gray-300">
            {userData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="py-2 px-4 border-b border-gray-600">
                  {user._id}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.address}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.age}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.department}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.status}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.createdAt}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  {user.updatedAt}
                </td>
                <td className="py-2 px-4 border-b border-gray-600">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          formData={formData}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setIsModalOpen(false)}
          errors={errors}
          editHistory={editHistory[userData[editIndex]._id] || []}
        />
      )}
    </div>
  );
};

export default MyForm;

