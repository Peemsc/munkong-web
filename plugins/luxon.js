import Vue from 'vue'
import VueLuxon from 'vue-luxon'

Vue.use(VueLuxon, {
  input: {
    zone: 'Asia/Bangkok',
    format: 'iso'
  },
  output: {
    zone: 'locale',
    format: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    },
    locale: null,
    relative: {
      round: true,
      unit: null
    }
  }
})
import { DateTime } from "luxon";

Vue.filter("thaiDate", function (value) {
  if (!value) return "";
  const date = DateTime.fromISO(value);
  const thaiMonths = [
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค."
  ];
  const thaiYear = (date.year + 543).toString().slice(-2);
  const thaiMonth = thaiMonths[date.month - 1];
  const thaiDay = date.day;
  return `${thaiDay} ${thaiMonth} ${thaiYear}`;
});

