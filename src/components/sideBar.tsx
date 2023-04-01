import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router";

const SideBar = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logOut = () => {
    signOut();
    navigate("/login");
  };
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-6">
          <li className="text-gray-500 hover:text-gray-300 cursor-pointer">
            My Page
          </li>
          <li className="text-gray-500 hover:text-gray-300 cursor-pointer">
            계시판
          </li>
          <li
            onClick={logOut}
            className="text-gray-500 hover:text-gray-300 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
