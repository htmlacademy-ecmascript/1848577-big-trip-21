import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import {DateTime} from '../const';

const MSEC_IN_HOUR = DateTime.MIN_IN_HOUR * DateTime.SEC_IN_MIN * DateTime.MSEC_IN_SEC;
const MSEC_IN_DAY = DateTime.HOUR_IN_DAY * MSEC_IN_HOUR;

const humanizeDate = (date, dataFormat) => date ? dayjs(date).format(dataFormat) : '';

const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  let pointDuration = 0;

  switch (true) {
    case (timeDiff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }

  return pointDuration;
};

const createToUpperCase = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const isDatesEqual = (dateA, dateB) =>
  (dateA === null && dateB === null) || (dayjs(dateA).valueOf() === dayjs(dateB).valueOf());

export {humanizeDate, getPointDuration, createToUpperCase, isDatesEqual};
