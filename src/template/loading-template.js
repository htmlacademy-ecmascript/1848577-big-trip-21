const createLoadingTemplate = (isErrorMessage) => {
  const message = isErrorMessage ? 'Failed to load latest route information' : 'Loading...';

  return `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">${message}</p>
    </section>
  `;
};

export {createLoadingTemplate};
