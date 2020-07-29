const initialState = {
    count: 0
};

const reducer = (state = initialState,action) => {
    const newState = {
        ...state
    };
    switch(action.type) {
        case 'COUNT_UP':
            newState.count += action.value;
            break;
        case 'COUNT_DOWN':
            newState.count -= action.value;
            break;
        default:
            break;
    }
    return newState;
};
export default reducer;
