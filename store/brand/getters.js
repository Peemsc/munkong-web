export default {
  getBrands: state => state.brands,
  filterBrand: state => filter => state.brands.filter(item => item.brandName[0].toUpperCase() === filter),
  //search brand page product index
  searchBrand: state => name => state.brands.filter(item => item.brandName.toLowerCase().indexOf(name.toLowerCase()) > -1 || name === ''),
  //search in header
  // search: state => name => state.brands.filter(item => item.brandName.toLowerCase().indexOf(name.toLowerCase()) > -1 && name !== '')
  search: state => searchString => state.brands.filter(obj => obj.brandName.toLowerCase().indexOf(searchString.toLowerCase()) === 0),
  // search: state => (name, currentPage) => {
  //   const filteredItems = state.brands.filter(item => item.brandName.toLowerCase().indexOf(name.toLowerCase()) > -1 )
  //   const startIndex = (currentPage - 1) * 10
  //   const endIndex = startIndex + 10
  //   return filteredItems.slice(startIndex, endIndex)
  // }
}
