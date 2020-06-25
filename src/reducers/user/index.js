export const userActiveReducer = (userActive = {}, action) => {
    if (action.type === 'AUTH_USER') {
        return action.payload;
    }
    return userActive;
};

export const changeSessionReducer = (isAUth = false, action) => {
    if (action.type === 'IS_AUTHENTICATED') {
        return action.payload;
    }
    return isAUth;
};
