import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button, Table } from "react-bootstrap";
import AddProductModal from "../Modals/AddProductModal";
import { useDispatch, useSelector } from "react-redux";
import { getList, removeItem } from "../../redux/actions";
import ConfirmationModal from "../Modals/ConfirmationModal";

const Products = () => {
    const [selectedItemID, setSelectedItemID] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemList, setItemList] = useState([]);

    const dispatch = useDispatch();
    const items = useSelector((state) => state.myReducer.items);

    const handleOnClose = () => {
        setSelectedItemID(null);
        setShowAddModal(false);
    };

    const openItem = (id) => {
        setSelectedItemID(id);
        setShowAddModal(true);
    };

    useEffect(() => {
        dispatch(getList());
    }, []);

    useEffect(() => {
        setItemList(items);
    }, [items]);

    return (
        <>
            <AddProductModal
                selectedID={selectedItemID}
                showModal={showAddModal}
                onClose={handleOnClose}
            />
            <ConfirmationModal
                selectedID={selectedItemID}
                showModal={showConfirmModal}
                onClose={(itemId) => {
                    if (itemId) {
                        dispatch(removeItem(itemId));
                    }
                    setShowConfirmModal(false);
                }}
            />
            <div className="page-header">
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add
                </Button>
            </div>
            <Table className="" striped bordered hover>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {itemList &&
                        itemList.map((item) => (
                            <tr
                                key={item.id}
                                style={{ cursor: "pointer" }}
                                onClick={() => openItem(item.id)}
                            >
                                <td>{item.id}</td>
                                <td>{item.productName}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedItemID(item?.id);
                                            setShowConfirmModal(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    );
};

export default Products;
