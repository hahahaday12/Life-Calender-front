import  Axios  from 'axios';
import { API_URL } from '../Common/Common';

const PATH = '/user';

const Api =  {
  user: function () {
    return Axios.get(API_URL + PATH);
  },

  calendarGet: function () {
    return Axios.get(API_URL + '/diary');
  },

  todoGet: function (year, month ,day) {
    return Axios.get(API_URL+ '/todo?year='+year+'&month='+month+'&day='+day)
  },

  todoPost: function ({ content, date, status}) {
    return Axios.post(API_URL+'/todo', {
      content ,date, status:"todo"})
  },

  todoDelet: function (idx) {
    return Axios.delete(API_URL+'/todo/'+ idx,{})
  },

  todoPatch: function ({id, status}) {
    return Axios.patch(API_URL+'/todo/'+ id,{
    status:status})
  },

  buketPost: function ({ title, content, date}) {
    return Axios.post(API_URL + `/bucketlist`, {
      title, content, date});
  },

  buketGet: function () {
    return Axios.get(API_URL+ '/bucketlist')
  },

  bucketDelete: function (idx) {
    return Axios.delete(API_URL +'/bucketlist/' + idx,{})
  },

  diaryPost: function ({title, content, date, color}) {
    return Axios.post(API_URL + '/diary',{
      title, content, date, color
    })
  },

  diaryPatch: function({title, content, date, color, id}) {
    return Axios.patch(API_URL + '/diary/' + id,{
      title, content, date, color
    })
  }
};
export default Api