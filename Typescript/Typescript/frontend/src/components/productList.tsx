import React, { useEffect, useState } from "react";
import { useAppSelector } from "../state";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../state/action-creator/";
import ProductModal from "../modal/productModal";
import { Button, Pagination } from "react-bootstrap";
import Sidebar from "./sidebar";

interface Product {
  id: number;
  name: string;
  rating: string;
  quantity: string;
}

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch: any = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<any>();
  const [singleProduct, setSingleProduct] = useState<any>();
  const { data, error, loading } = useAppSelector((state: any) => state.repo);

  // Fetch products on component mount and update total pages
  useEffect(() => {
    dispatch(fetchProducts());
    setTotalPages(data?.totalPages);
  }, [data?.totalPages, !isModalOpen]);

  // Function to open the modal
  const openModal = (data: any) => {
    if (data.name) {
      setSingleProduct(data);
      setIsCreate(false);
    } else {
      setIsCreate(true);
      setSingleProduct({
        name: "",
        price: 0,
        description: "",
      });
    }
    setIsModalOpen(!isModalOpen); // Always open modal when clicking a product
  };

  // Function to render pagination page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const ellipsis = <Pagination.Ellipsis />;
    const keyPrefix = "page";
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    if (startPage > 1) {
      pages.push(
        React.cloneElement(ellipsis, { key: `${keyPrefix}_ellipsis_start` })
      );
    }
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <Pagination.Item
          key={`${keyPrefix}_${page}`}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        React.cloneElement(ellipsis, { key: `${keyPrefix}_ellipsis_end` })
      );
    }
    return pages;
  };

  // Function to handle page change
  const handlePageChange = async (newPage: number) => {
    if (newPage <= totalPages && newPage >= 1) {
      dispatch(fetchProducts(newPage));
      setCurrentPage(newPage);
    }
  };

  // Function to handle product deletion
  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id, currentPage));
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="d-flex">
        <Pagination className="">
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          {renderPageNumbers()}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
        <button
          type="button"
          onClick={openModal}
          className=" ms-auto text-center  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Create Product
        </button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Remove/Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.length &&
            data?.products?.map((item: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item.id}
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.description}</td>
                <td className="px-6 py-4">
                  <Button
                    onClick={() => handleDelete(item._id)}
                    variant="danger"
                    className="text-black"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => openModal(item)}
                    variant="warning"
                    className="text-black mx-2 rounded-pill px-3"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ProductModal
          hide={closeModal}
          show={isModalOpen}
          productModal={singleProduct}
          isCreate={isCreate || false}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default ProductList;
