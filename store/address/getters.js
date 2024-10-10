export default {
  filterDistrict: state => id => state.province.filter(item => item.name_th === id)
}
