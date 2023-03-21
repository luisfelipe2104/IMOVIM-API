import dayjs from 'dayjs-with-plugins';
dayjs.locale('pt-br');

function relativeTime(data)
{
  return dayjs(data).fromNow();
}

export default relativeTime;