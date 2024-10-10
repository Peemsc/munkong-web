export default {
  FETCH_HIGHLIGHT(state, data) {
    state.highlights = data
  },
  GET_HIGHLIGHT (state, data) {
    state.highlight = data
  },
  FETCH_HIGHLIGHT_All(state,data) {
    state.highlightAll = data
  }
}
