import dayjs from 'dayjs';
import { getRandomInteger } from './common.js';
import { Duration } from '../const.js';

const getDate = ({next}) => {
  let date = dayjs().subtract(getRandomInteger(0, Duration.DAY), 'day').toDate();
  const minsGap = getRandomInteger(0, Duration.MIN);
  const hoursGap = getRandomInteger(0, Duration.HOUR);
  const daysGap = getRandomInteger(0, Duration.DAY);

  if (next) {
    date = dayjs()
      .add(minsGap, 'minute')
      .add(hoursGap, 'hour')
      .subtract(daysGap, 'day').toDate();
  }

  return date;
};

const humanizeDate = (date, dataFormat) => date ? dayjs(date).format(dataFormat) : '';

const dateDiff = (dateFrom, dateTo) => {
  const timeFrom = dayjs(dateFrom);
  const timeTo = dayjs(dateTo);
  const diffTime = timeTo.diff(timeFrom, 'minutes');
  const timeDay = Math.floor(diffTime / 1440);
  const answerH = diffTime - timeDay * 1440;
  const timeHour = Math.floor(answerH / 60);
  const timeMinute = answerH - timeHour * 60;

  let answer = '';

  if (diffTime <= 0) {
    return 'wrong date';
  } else {
    if (timeDay !== 0) {
      answer = `${timeDay.toString().padStart(2, '0')}d`;
    }
    if (timeHour !== 0) {
      answer += `${timeHour.toString().padStart(2, '0')}h`;
    }
    if (timeMinute !== 0) {
      answer += `${timeMinute.toString().padStart(2, '0')}m`;
    }
    return answer;
  }
};

const createToUpperCase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

export { getDate, humanizeDate, dateDiff, createToUpperCase};
