import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import Vue from 'vue'

Vue.filter('numFormat', numFormat(numeral));

Vue.filter('stripHTML', function (value) {
  const div = document.createElement('div')
  div.innerHTML = value
  const text = div.textContent || div.innerText || ''
  return text
});

Vue.filter('numWithFloat', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
  })

  return formatter.format(value).replaceAll('฿', '')
})

Vue.filter('numWihOutFloat', function (value) {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  return formatter.format(value).replaceAll('฿', '')
})

Vue.filter('dateThai', function (date) {
  return new Date(date).toLocaleDateString('th-TH', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
})
