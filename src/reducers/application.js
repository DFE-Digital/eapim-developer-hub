import * as ActionType from 'actions/application'

const INITIAL_STATE = {
  details: {},
  list: [],
  fetching: false,
  registering: false,
  updating: false,
  selectedApplication: undefined,
  lastUpdate: Date.now()
}

const applicationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.STORE_DATA: {
      return { ...state, details: { ...state.details, ...action.payload } }
    }
    case ActionType.REGISTER_APP: {
      return { ...state, registering: true }
    }
    case ActionType.REGISTER_APP_SUCESS: {
      return { ...state, registering: false, details: {} }
    }
    case ActionType.CANCEL_APPLICATION: {
      return { ...state, details: {} }
    }
    case ActionType.SELECT_APPLICATION: {
      return { ...state, registering: false, selectedApplication: action.payload }
    }
    case ActionType.CLEAR_APPLICATION: {
      return { ...state, selectedApplication: undefined }
    }
    case ActionType.REQUEST_APPLICATIONS: {
      return { ...state, fetching: true, list: [] }
    }
    case ActionType.RECEIVED_APPLICATIONS: {
      return { ...state, fetching: false, list: action.payload }
    }
    case ActionType.REQUEST_UPDATE_APPLICATION: {
      return { ...state, updating: true }
    }
    case ActionType.RECEIVED_UPDATE_APPLICATION: {
      return { ...state, updating: false }
    }
    case ActionType.REQUEST_DELETE_APPLICATION: {
      return { ...state, deleting: true }
    }
    case ActionType.RECEIVED_DELETE_APPLICATION: {
      return { ...state, deleting: false, selectedApplication: undefined }
    }
    default:
      return state
  }
}

export default applicationsReducer
