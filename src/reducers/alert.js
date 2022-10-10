
export const initialState = {
    message: '',
    statut: null
}; 

const reducer = (state = initialState, action = {}) => {

    switch (action.type) {

        case 'SEND':
            return {
                message: action.message,
                statut: 'send'
            };
        case 'SUCCESS':
        return {
            message: action.message,
            statut: 'success'
        };
        case 'ERROR':
        return {
            message: action.message,
            statut: 'error'
        };
        default:
            return state;
    }
};

export default reducer;


