import {combineReducers} from 'redux'
import {fromJS} from 'immutable'
import {
  NEW_TEXT,
  SET_HOVER,
  TICK,
  SET_COLOR,
  INCREMENT_RENDER_COUNT
} from './constants'

const defaultState = {
  text: {},
  colors: {
    user1: 'blue',
    user2: 'orange'
  },
  hover: null,
  tick: 0,
  renderCount: {}
}

// ACTION REDUCER
function newText (state, action) {
  const text = fromJS(state)
  return text.mergeDeep(action.text).toJS()
}

function setHover (state, action) {
  return action.letter
}

function incrementTick (state, action) {
  return state + 1
}

function setColor (state, action) {
  const colors = fromJS(state)
  return colors.mergeDeep({[action.user]: action.color}).toJS()
}

function incrementRenderCount (state, action) {
  const renderCount = fromJS(state)
  return renderCount
    .updateIn([action.component, action.mode], (value = 0) => value + 1)
    .toJS()
}

// TOP LEVEL REDUCERS
function text (state = defaultState.text, action) {
  switch (action.type) {
    case NEW_TEXT:
      return newText(state, action)
    default:
      return state
  }
}

function colors (state = defaultState.colors, action) {
  switch (action.type) {
    case SET_COLOR:
      return setColor(state, action)
    default:
      return state
  }
}

function hover (state = defaultState.hover, action) {
  switch (action.type) {
    case SET_HOVER:
      return setHover(state, action)
    default:
      return state
  }
}

function tick (state = defaultState.tick, action) {
  switch (action.type) {
    case TICK:
      return incrementTick(state, action)
    default:
      return state
  }
}

function renderCount (state = defaultState.renderCount, action) {
  switch (action.type) {
    case INCREMENT_RENDER_COUNT:
      return incrementRenderCount(state, action)
    default:
      return state
  }
}

export default combineReducers({text, colors, hover, tick, renderCount})
