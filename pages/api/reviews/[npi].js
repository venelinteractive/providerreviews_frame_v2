export default async function handler(req, res) {
  const { npi } = req.query;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 20;

  try {
    // Fetch the provider's reviews from your API
    const response = await fetch(
      `${process.env.API_URL}npi2/${npi}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          accept: 'application/json',
          apikey: process.env.API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch reviews');
    }

    const data = await response.json();

    // Filter and sort the reviews
    const filteredReviews = data.reviews
      .filter(
        (review) =>
          review.comment &&
          review.comment.trim() !== 'External Review' &&
          review.source !== 'Experience' &&
          review.rating >= 4
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return the filtered and paginated reviews
    res.status(200).json({
      reviews: filteredReviews,
      page,
      pageSize,
      hasMore: filteredReviews.length === pageSize,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
