export function paginateResults(query, { page = 1, limit = 10 }) {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
}
