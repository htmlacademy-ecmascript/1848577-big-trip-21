import dayjs from 'dayjs';
import { SortType } from '../const';

const getPointsDateDifference = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const getPointsPriceDifference = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const getPointsDurationDifference = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return pointBDuration - pointADuration;
};

const sort = {
  [SortType.DAY]: (points) => points.toSorted(getPointsDateDifference),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is not implemented`);
  },
  [SortType.TIME]: (points) => points.toSorted(getPointsDurationDifference),
  [SortType.PRICE]: (points) => points.toSorted(getPointsPriceDifference),
  [SortType.OFFERS]: () => {
    throw new Error(`Sort by ${SortType.OFFERS} is not implemented`);
  }
};

export { sort };
