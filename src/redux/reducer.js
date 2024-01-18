import { CREATE_ITEM, DELETE_ITEM, GET_LIST_SUCCESS, SET_ITEM } from "./constant";

const initialState = {
    items: [],
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ITEM:
            return {
                ...state,
                items: [...state.items, action.item],
            };
        case SET_ITEM:
            return {
                ...state,
                items: state.items.map((item) => {
                    if (item.id === action?.item?.id)
                        return {
                            ...action.item
                        }
                    return item;
                })
            };
        case GET_LIST_SUCCESS:
            return {
                ...state,
                items: action.items,
            };
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(i => i.id !== action.id),
            };
        default:
            return state;
    }
};

export default myReducer;
