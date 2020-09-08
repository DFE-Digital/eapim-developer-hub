export const SET_RETURN_URL = Symbol('SET_RETURN_URL')

export const setReturnUrl = (url) => async dispatch => {
  dispatch({ type: SET_RETURN_URL, payload: url })
}
