import * as ActionType from 'actions/returnUrl'

const INITIAL_STATE = {
  returnUrl: '/',
  lastUpdate: Date.now()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.SET_RETURN_URL: {
      return { ...state, returnUrl: action.payload }
    }
    default:
      return state
  }
}
