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
      <button onClick={getCustomers}>get-customers</button>
      <button onClick={logOut}>logout</button>
    </div>
  );
};

export default Home;
