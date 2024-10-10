export default {
  // filteredProducts: state => filterType => {
  //   if (filterType === "min-max") {
  //     return state.products.slice().sort((a, b) => a.unitPrice - b.unitPrice);
  //   } else if (filterType === "max-min") {
  //     return state.products.slice().sort((a, b) => b.unitPrice - a.unitPrice);
  //   } else if (filterType === "aesc") {
  //     return state.products
  //       .slice()
  //       .sort((a, b) => a.itemDescription?.localeCompare(b.itemDescription));
  //   } else if (filterType === "desc") {
  //     return state.products
  //       .slice()
  //       .sort((a, b) => b.itemDescription?.localeCompare(a.itemDescription));
  //   } else {
  //     return state.products;
  //   }
  // },
  search: state => name => state.allProducts.filter(item => item.itemDescription.toLowerCase().indexOf(name.toLowerCase()) > -1 && name !== ''),
  showSearch: state => {
    return (brandId, productName) => {
      return state.products.filter(item => item.itemDescription.toLowerCase().indexOf(productName.toLowerCase()) > -1 || item.brand === brandId)
    }
  },
}

