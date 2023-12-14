import moment from 'moment'
moment.locale("zh-cn")
const formatTime = {
  getTime: (date) => {
    return moment(date).format('YYYY/MM/DD a h:mm'); 

  }
}
export default formatTime