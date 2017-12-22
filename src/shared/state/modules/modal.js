// import { lockScroll, unlockScroll } from "../../libs/scrollLock.js";

export const types = {
    INSERT_MODAL: "INSERT_MODAL",
    SHOW_MODAL: "SHOW_MODAL",
    HIDE_MODAL: "HIDE_MODAL",
    SET_STATUS_MODAL: "SET_STATUS_MODAL",
    REMOVE_MODAL: "REMOVE_MODAL"
};

const initialState = {
    modalType: null,
    modalProps: {}
};

export default function modal(state = initialState, action) {
    switch (action.type) {
        case types.SHOW_MODAL:
            return {
                ...state,
                modalType: action.modalType,
                modalProps: action.modalProps
            };
        case types.SET_STATUS_MODAL:
            return {
                ...state,
                modalProps: { ...state.modalProps, ...action.status}
            };

        case types.HIDE_MODAL:
            return initialState;

        default:
            return state;
    }
}

export const actions = {
    openModal: modalParams => {
        // lockScroll();
        return {
            type: types.SHOW_MODAL,
            ...modalParams
        };
    },
    setStatusModal: status => {
        // lockScroll();
        console.log(status);
        return {
            type: types.SET_STATUS_MODAL,
            status
        };
    },
    closeModal: () => {
        return {
            type: types.HIDE_MODAL
        };
    }
};
