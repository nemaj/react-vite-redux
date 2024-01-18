import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Modal } from "react-bootstrap";
import ProductForm from "../Forms/ProductForm";
import { useDispatch } from "react-redux";
import { createItem, updateItem } from "../../redux/actions";

const AddProductModalForm = (props) => {
    const { selectedID, showModal, onClose } = props;

    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        if (selectedID) {
            dispatch(updateItem({ ...values, id: selectedID }));
            onClose();
            return;
        }
        let id = Date.now().toString();
        let item = {
            id,
            ...values,
        };
        dispatch(createItem(item));
        onClose();
    };

    return (
        <Modal show={showModal} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{!selectedID ? "Add" : "Edit"} Product</Modal.Title>
            </Modal.Header>
            <ProductForm selectedID={selectedID} onSubmit={handleSubmit} />
        </Modal>
    );
};

export default AddProductModalForm;
