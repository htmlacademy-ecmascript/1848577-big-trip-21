import AbstractView from '../framework/view/abstract-view.js';
import { createPointListAbsenceTemplate } from '../template/point-list-absence-template.js';

export default class PointListAbsenceView extends AbstractView {
  get template() {
    return createPointListAbsenceTemplate();
  }
}
