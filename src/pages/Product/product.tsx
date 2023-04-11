/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";
import ProductListTable from "../../components/Table/productList";
import { extractJwtToken } from "../../helpers/jwtHelper";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router";

const ProductPage = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://lb.dcloser.com/customer-company",
        {
          headers: {
            Authorization: extractJwtToken(document.cookie),
          },
        }
      );
      const data = response.data.customerCompanies;
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const logOut = () => {
    signOut();
    navigate("/login");
  };
  return (
    <div>
      <button onClick={logOut}>Logout</button>
      <h1>Product List</h1>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Product Name</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Quantity</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {products.map((product: any) => (
            <tr
              key={product.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {product.name}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {product.business_id}
              </td>
              <td className="py-3 px-6 text-left">{product.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
