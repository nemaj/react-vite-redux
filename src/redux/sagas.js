import { call, put, takeEvery } from "redux-saga/effects";
import {
    CREATE_ITEM,
    DELETE_ITEM,
    GET_LIST_SUCCESS,
    LIST_ITEMS,
    READ_ITEM,
    REMOVE_ITEM,
    SET_ITEM,
    SET_ITEMS,
} from "./constant";

function productFetch() {
    return fetch("http://localhost:3000/products").then((res) => res.json());
}

function addProduct(item) {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    }).then((res) => res.json());
}

function removeProduct(id) {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
    }).then((res) => res.json());
}

function updateProduct(item) {
    return fetch(`http://localhost:3000/products/${item?.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productName: item?.productName,
            description: item?.description
        }),
    }).then((res) => res.json());
}

function* getListOfItems() {
    const items = yield call(productFetch);
    yield put({ type: GET_LIST_SUCCESS, items });
}

function* setItem(data) {
    const item = yield call(addProduct, data.payload);
    yield put({ type: CREATE_ITEM, item });
}

function* removeItem(data) {
    const item = yield call(removeProduct, data.payload);
    yield put({ type: DELETE_ITEM, id: item?.id });
}

function* updateItem(data) {
    const item = yield call(updateProduct, data.payload);
    yield put({ type: SET_ITEM, item });
}

function* mySaga() {
    yield takeEvery(LIST_ITEMS, getListOfItems);
    yield takeEvery(SET_ITEMS, setItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(READ_ITEM, updateItem);
}

export default mySaga;
