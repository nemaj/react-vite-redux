import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const ConfirmationModal = (props) => {
    const { selectedID, showModal, onClose } = props;

    const list = useSelector((state) => state.myReducer.items);
    const [productName, setProductName] = useState("");

    const handleClose = (itemId = "") => {
        onClose(itemId || "");
    };

    useEffect(() => {
        if (selectedID) {
            const name = list.find(i => i.id === selectedID)?.productName;
            setProductName(name);
        }
    }, [selectedID])

    return (
        <Modal show={showModal} onHide={() => handleClose()}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <p>Are you sure do you want to delete {productName}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    No
                </Button>
                <Button variant="primary" onClick={() => handleClose(selectedID)}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
