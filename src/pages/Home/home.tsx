import axios from "axios";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router";

const Home = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const logOut = () => {
    signOut();
    navigate("/login");
  };
  const extractJwtToken = (s: string) => {
    const tokenStart = s.indexOf("_auth=") + "_auth=".length;
    const tokenEnd =
      s.indexOf("; _auth_type=Bearer") !== -1
        ? s.indexOf("; _auth_type=Bearer")
        : s.length;
    const token = s.slice(tokenStart, tokenEnd);
    return token;
  };

  const getCustomers = async () => {
    await axios.get("https://lb.dcloser.com/customer-company", {
      headers: {
        Authorization: extractJwtToken(document.cookie),
      },
    });
  };
  return (
    <div>
      <div>
        <button
          className="w-3/6 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-700"
          onClick={getCustomers}
        >
          get-customers
        </button>
        <button
          className="w-3/6 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:bg-gray-700"
          onClick={logOut}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Home;
