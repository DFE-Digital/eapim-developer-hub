import * as ActionType from 'actions/authenticate'

const INITIAL_STATE = {
  data: {
    isAuthed: false
  },
  isFetching: false,
  deleting: false,
  lastUpdate: Date.now()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNIN: {
      return { ...state }
    }
    case ActionType.REQUEST_EDIT_PROFILE: {
      return { ...state }
    }
    case ActionType.RECEIVE_SIGNIN: {
      return { ...state, isFetching: false, data: action.payload }
    }
    case ActionType.CLEAR_ERRORS: {
      return { ...state, data: { isAuthed: false } }
    }
    case ActionType.REQUEST_DELETE_ACCOUNT: {
      return { ...state, deleting: true }
    }
    case ActionType.RECEIVE_DELETE_ACCOUNT: {
      return { ...state, deleting: false }
    }
    default:
      return state
  }
}
