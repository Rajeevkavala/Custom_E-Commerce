import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-hot-toast";
import axios from "axios"; // Import axios

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/users", {
          withCredentials: true, // To include cookies in the request
        });
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Only run once when the component mounts

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await axios.delete(`/api/users/${id}`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUsers(users.filter(user => user._id !== id)); // Remove user from the list
        toast.success("User deleted successfully!");
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      const updatedUser = {
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      };
      await axios.put(`/api/users/${id}`, updatedUser, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setEditableUserId(null);
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, ...updatedUser } : user
        )
      );
      toast.success("User updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 text-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 sm:text-center">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="flex flex-col md:flex-row md:justify-center">
          <table className="w-full md:w-3/4 mx-auto table-auto">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-[#181a1b] text-white"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        {user.username}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-2" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full p-2 border rounded-lg bg-[#181a1b] text-white"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="ml-2" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex justify-center">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
