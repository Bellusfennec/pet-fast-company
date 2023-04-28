export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return [...items].splice(startIndex, pageSize);
}

export function totalPage(count, pageSize) {
  return Math.ceil(count / pageSize);
}
