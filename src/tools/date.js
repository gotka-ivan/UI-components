export function dayOfThisWeek(numberOfDay) {
  const delta = numberOfDay - new Date().getDay(),
    date = new Date()
  date.setDate(new Date().getDate() + delta)
  return date
}
