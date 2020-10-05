import * as ActionType from 'actions/apis'

const INITIAL_STATE = {
  apis: [],
  selectedApi: undefined,
  fetching: false,
  lastUpdate: Date.now()
}

const apisReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionType.REQUEST_APIS: {
      return { ...state, fetching: true, apis: [] }
    }
    case ActionType.RECEIVED_APIS: {
      return { ...state, fetching: false, apis: action.payload }
    }
    case ActionType.STORE_APIS: {
      return { ...state, apis: action.payload }
    }
    case ActionType.STORE_API: {
      return { ...state, selectedApi: action.payload }
    }
    case ActionType.CLEAR_API: {
      return { ...state, selectedApi: undefined }
    }
    default:
      return state
  }
}

export default apisReducer
