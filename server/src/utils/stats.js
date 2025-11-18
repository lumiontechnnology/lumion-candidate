function computeStats(applications) {
  const byDay = {};
  const byStatus = {};
  const bySource = {};
  let total = 0;

  for (const app of applications) {
    total += 1;
    const dateKey = new Date(app.date).toISOString().slice(0, 10);
    byDay[dateKey] = (byDay[dateKey] || 0) + 1;

    const statusKey = app.status || 'Unknown';
    byStatus[statusKey] = (byStatus[statusKey] || 0) + 1;

    const sourceKey = app.source || 'Unknown';
    bySource[sourceKey] = (bySource[sourceKey] || 0) + 1;
  }

  return { total, byDay, byStatus, bySource };
}

module.exports = { computeStats };