import { LIST_ITEMS, READ_ITEM, REMOVE_ITEM, SET_ITEMS } from "./constant"

export const createItem = (item) => {
    return {
        type: SET_ITEMS,
        payload: item
    }
}

export const updateItem = (item) => {
    return {
        type: READ_ITEM,
        payload: item
    }
}

export const getList = () => {
    return {
        type: LIST_ITEMS
    }
}

export const removeItem = (id) => {
    return {
        type: REMOVE_ITEM,
        payload: id
    }
}
