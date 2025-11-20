const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  {
    title: "Prison Break",
    days: 2,
    hours: 16,
    minutes: 32,
  },
];

function logOutSeriesText() {
  const lifespanInMinutes = 80 * 365 * 24 * 60;
  let totalPercentage = 0;

  seriesDurations.forEach(function (series) {
    const seriesInMinutes =
      series.days * 24 * 60 + series.hours * 60 + series.minutes;

    const percentage = (seriesInMinutes / lifespanInMinutes) * 100;

    totalPercentage = totalPercentage + percentage;

    console.log(`${series.title} took ${percentage.toFixed(3)}% of my life`);
  });

  console.log(`In total that is ${totalPercentage.toFixed(3)}% of my life`);
}

logOutSeriesText();
