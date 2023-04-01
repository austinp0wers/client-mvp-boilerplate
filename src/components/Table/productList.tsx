import React from "react";

const ProductListTable = ({ products }: any) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Product Name</th>
          <th className="py-3 px-6 text-left">Price</th>
          <th className="py-3 px-6 text-left">Quantity</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {products.customerCompanies.map((product: any) => (
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
  );
};

export default ProductListTable;
