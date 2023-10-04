const createInfoTemplate = ({userPrice, tripTitle, tripDuration}) =>
  `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripTitle}</h1>
          <p class="trip-info__dates">${tripDuration}</p>
      </div>
      ${userPrice ?
    `<p class="trip-info__cost">
        Total: &euro;&nbsp;
        <span class="trip-info__cost-value">${userPrice}</span>
      </p>`
    : ''}
    </section>
  `;

export {createInfoTemplate};
