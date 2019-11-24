import Vue from 'vue'
import moment from 'moment'

Vue.filter('datetime', function(value: any, format: string) {
  if (!value) return ''

  format = format || 'YYYY/MM/DD HH:mm'
  return moment(value).format(format)
})

Vue.filter('truncate', (value: any, length: any, omission: string) => {
  length = length ? parseInt(length, 10) : 20
  omission = omission ? omission.toString() : '...'

  if (value.length <= length) {
    return value
  } else {
    return value.substring(0, length) + omission
  }
})
