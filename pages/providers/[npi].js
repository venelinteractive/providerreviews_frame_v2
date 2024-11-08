import Head from 'next/head';
import { useInView } from 'react-intersection-observer';
import Layout from '../../components/layout';
import ReviewList from '../../components/ReviewList';
import Stars from '../../components/stars';
import { useCallback, useState, memo, useEffect } from 'react';

const REVIEWS_PER_PAGE = 20;

export default function Provider({ initialProvider }) {
  const [provider, setProvider] = useState(initialProvider);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Intersection Observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  // Memoized fetch function
  const fetchMoreReviews = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(
        `/api/reviews/${provider.npi}?page=${nextPage}&pageSize=${REVIEWS_PER_PAGE}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await res.json();

      // If we get fewer reviews than the page size, we've reached the end
      if (!data.reviews || data.reviews.length < REVIEWS_PER_PAGE) {
        setHasMore(false);
      }

      // Only update if we actually got new reviews
      if (data.reviews && data.reviews.length > 0) {
        setProvider((prev) => ({
          ...prev,
          reviews: [...prev.reviews, ...data.reviews],
        }));
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more reviews:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, provider.npi, page]);

  // Load more when scrolling into view
  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchMoreReviews();
    }
  }, [inView, fetchMoreReviews, hasMore, loading]);

  return (
    <Layout>
      <Head>
        <title>{`Review Summary: ${provider.listing}`}</title>
        <meta
          name='description'
          content={`Reviews and ratings for ${provider.listing}`}
        />
      </Head>

      <section className='provider-section'>
        <ProviderHeader
          totalRating={provider.total_rating}
          totalCount={provider.total_count}
          npi={provider.npi}
          listing={provider.listing}
        />

        <div className='reviews-container'>
          <ReviewList
            provider={provider}
            loadMoreRef={loadMoreRef}
            loading={loading}
            hasMore={hasMore}
          />
          {loading && (
            <div className='text-center py-4'>Loading more reviews...</div>
          )}
          {!hasMore && (
            <div className='text-center py-4 text-gray-500'>
              No more reviews to load
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

// Extracted header component for better organization
const ProviderHeader = memo(({ totalRating, totalCount, npi, listing }) => (
  <div className='md:flex content-center'>
    <div className='w-full flex flex-col items-center p-4 mb-8 text-center'>
      <div className='text-xs font-bold'>Review Summary:</div>
      <div className='text-2xl font-bold'>{listing}</div>
      <div className='total-rating text-2xl font-bold'>{totalRating.toFixed(2)}</div>
      <div className='flex justify-center my-2'>
      <Stars
        ratingId={npi}
        ratingValue={totalRating}
        noBorder
        size={32}
        colors={{
          rear: 'lightgray',
          mask: '#0070f3',
          stroke: 'lightgray',
        }}
      />
      </div>
      <div className='text-xs'>{totalCount} ratings and reviews</div>
    </div>
  </div>
));

ProviderHeader.displayName = 'ProviderHeader';

// Add getStaticPaths
export async function getStaticPaths() {
  try {
    // Fetch list of provider NPIs
    const res = await fetch(`${process.env.API_URL}/providers?clientid=%25`, {
      headers: {
        accept: 'application/json',
        apikey: process.env.API_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch providers');
    }

    const providers = await res.json();

    // Generate paths for each provider
    const paths = providers.map(({ npi }) => ({
      params: { npi: npi.toString() },
    }));

    return {
      paths,
      // Use fallback: 'blocking' if you want to generate new pages at runtime
      // Use fallback: false if you want to return 404 for unknown providers
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    // Return empty paths array in case of error
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

// Optimized getStaticProps
export async function getStaticProps({ params }) {
  try {
    const provider = await fetchProviderData(params.npi);

    if (!provider) {
      return {
        notFound: true,
        revalidate: 60, // Try again in 60 seconds
      };
    }

    const filteredReviews = filterAndSortReviews(provider.reviews);

    return {
      props: {
        initialProvider: {
          ...provider,
          reviews: filteredReviews.slice(0, REVIEWS_PER_PAGE),
        },
        clientdetails: provider.client,
      },
      revalidate: 300,
    };
  } catch (err) {
    console.error('Error in getStaticProps:', err);
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}

// Utility functions
const fetchProviderData = async (npi) => {
  try {
    const apiUrl = process.env.API_URL.endsWith('/')
      ? process.env.API_URL
      : `${process.env.API_URL}/`;

    const res = await fetch(`${apiUrl}npi/${npi}`, {
      headers: {
        accept: 'application/json',
        apikey: process.env.API_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`API returned ${res.status} for NPI ${npi}`);
      return null;
    }

    return res.json();
  } catch (err) {
    console.error(`Error fetching provider data for NPI ${npi}:`, err);
    return null;
  }
};

const filterAndSortReviews = (reviews) => {
  return reviews
    .filter(
      (review) =>
        review.comment &&
        review.comment.trim() !== 'External Review' &&
        review.source !== 'Experience' &&
        review.rating > 4
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};
