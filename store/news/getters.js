export default {
  filterNews: state => type => state.newsList.filter(item => item.type === type)
}
