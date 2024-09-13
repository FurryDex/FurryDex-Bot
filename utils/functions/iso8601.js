function dateToIso(date) {
  date = new Date(date);

  let iso = date.toISOString();

  return iso;
}
