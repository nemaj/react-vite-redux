import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProductForm = (props) => {
    const { selectedID, onSubmit } = props;
    const list = useSelector((state) => state.myReducer.items);

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            productName,
            description
        })
    }

    useEffect(() => {
        if (!selectedID) return;
        const item = list.find((i) => i.id === selectedID);
        setProductName(item?.productName || "");
        setDescription(item?.description || "");
    }, [selectedID]);

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div className="product-form-field">
                <label htmlFor="productName">Product Name</label>
                <input
                    name="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    type="text"
                    required
                />
            </div>
            <div className="product-form-field">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    required
                />
            </div>
            <Button type="submit">{!selectedID ? 'Submit' : 'Update'}</Button>
        </form>
    );
};

export default ProductForm;
