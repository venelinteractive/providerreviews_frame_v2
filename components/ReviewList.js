import Image from 'next/image';
import { memo } from 'react';
import Stars from './stars';
import Platform from './platform';
import Reviewer from './reviewer';
import Date from './date';

const platformSites = new Set([
  'google',
  'facebook',
  'healthgrades',
  'vitals',
  'doctorreviews',
  'surgeonreview',
  'orthopedicreviews',
  'reparativemedicinedoctorreviews',
]);

const ReviewList = memo(({ provider, loadMoreRef, loading, hasMore }) => {
  const seenReviews = new Set();

  const uniqueReviews = provider.reviews.filter((review) => {
    const uniqueKey = `${review.review_id}-${review.date}-${review.platform}`;
    if (seenReviews.has(uniqueKey)) {
      return false;
    }
    seenReviews.add(uniqueKey);
    return true;
  });

  return (
    <div>
      <ul className='reviewlist lg:grid lg:grid-cols-2 lg:gap-4'>
        {uniqueReviews.map((review, index) => {
          const uniqueKey = `${review.review_id}-${review.date}-${review.platform}-${index}`;

          return (
            <ReviewListItem
              key={uniqueKey}
              review={review}
              providerName={provider.listing}
            />
          );
        })}
      </ul>

      <div ref={loadMoreRef} className='h-10 w-full' aria-hidden='true' />
    </div>
  );
});

ReviewList.displayName = 'ReviewList';

const ReviewListItem = memo(({ review, providerName }) => {
  const { reviewer, review_id, date, platform, platform_url, rating, comment } =
    review;

  const cleanedPlatform =
    platform
      ?.toLowerCase()
      .replace(/\s/g, '')
      .replace('&', '-')
      .replace('.com', '') || 'unknown';

  const jsonLdData = {
    '@context': 'http://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: reviewer,
    },
    reviewRating: {
      '@type': 'Rating',
      bestRating: '5',
      ratingValue: rating,
      worstRating: '1',
    },
    datePublished: date,
    description: comment,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: providerName,
    },
  };

  return (
    <li className='reviewitem'>
      <div className='review-header md:flex md:justify-between md:items-center'>
        <div className='flex items-center gap-4'>
          <div className='reviewlogo'>
            <Image
              src={`/images/${
                platformSites.has(cleanedPlatform)
                  ? cleanedPlatform
                  : 'practice'
              }.png`}
              width={32}
              height={32}
              alt={platform || 'Unknown platform'}
              priority={false}
            />
          </div>
          <Stars
            ratingValue={rating}
            size={20}
            noBorder
            colors={{
              rear: 'lightgray',
              mask: '#0070f3',
              stroke: 'lightgray',
            }}
          />
        </div>

        <div className='review-meta md:text-right'>
          <Platform platformUrl={platform_url} platform={platform} />
          <Date dateString={date} />
        </div>
      </div>

      <div className='review-content font-sans text-sm subpixel-antialiased leading-normal pt-8'>
        <div>{comment}</div>
        <Reviewer reviewer={reviewer} />
      </div>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData),
        }}
      />
    </li>
  );
});

ReviewListItem.displayName = 'ReviewListItem';

export default ReviewList;
