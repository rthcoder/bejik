export function paginationResponse(totalCount, limit, page) {
  const totalPages = Math.ceil(totalCount / limit)
  return {
    totalCount,
    totalPages,
    currentPage: page,
    limit,
  }
}
