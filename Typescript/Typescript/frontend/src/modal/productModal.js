import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { productValidate } from "../utils/validation";
import { createProduct, updateProduct } from "../state/action-creator";

interface Props {
  hide: () => void;
  show: boolean;
  productModal: any;
  isCreate: boolean;
  currentPage: Number;
}

const ProductModal: React.FC<Props> = ({
  hide,
  show,
  productModal,
  isCreate,
  currentPage,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: productModal.name || "",
      price: productModal.price || "",
      description: productModal.description || "",
    },
    validationSchema: productValidate,
    onSubmit: async (values, { resetForm }) => {
      if (
        !isCreate &&
        (values.name !== productModal.name ||
          values.price !== productModal.price ||
          values.description !== productModal.description)
      ) {
        dispatch(updateProduct(values, productModal._id, currentPage));
        alert("edit success");
        hide();
      } else if (isCreate) {
        dispatch(createProduct(values, currentPage));
        alert("create success");
        hide();
      }
      alert("edit success");
    },
  });
  //   onSubmit: async (values, { resetForm }) => {
  //     dispatch(isCreate ? createProduct(values) :  updateProduct(values));
  //     hide();
  //   },
  // });

  useEffect(() => {
    formik.setValues({
      name: productModal.name || "",
      price: productModal.price || "",
      description: productModal.description || "",
    });
  }, [productModal]);

  return (
    <Modal
      size="lg"
      show={show}
      onHide={hide}
      centered
      className="edit-modal bg-red-200"
    >
      <Modal.Header closeButton className="border-bottom-0 text-prim ">
        <h5 className="font-bold text-center my-2">
          Product {isCreate ? "Add" : "Edit"}
        </h5>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={formik.values.name}
              name="name"
              onChange={formik.handleChange}
            />
            {formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label className="my-2">Rating</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {formik.errors.price && (
              <div className="text-danger">{formik.errors.price}</div>
            )}
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label className="my-2">Quantity</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-top-0 pt-0">
        <Button
          className="py-2 px-3 font-semibold text-green-600"
          onClick={formik.handleSubmit}
        >
          {isCreate ? "Add" : "Edit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
