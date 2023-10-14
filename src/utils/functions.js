export const formatFullHour = (createdAt) => {
  let date = new Date(createdAt).toLocaleDateString('en-GB');
  let dateHour = new Date(createdAt).toLocaleTimeString();
  return date.toString() + " - " + dateHour.toString();
}