export const pwCheck = (password) => {
    let _reg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/;
    return _reg.test(password); // boolean
};
