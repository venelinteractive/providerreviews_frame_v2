const url = `${process.env.API_URL}npi/${npi}`;
const providersApi = process.env.API_URL;

export async function getAllProviderIds() {
  const res = await fetch(providersApi, {
    headers: {
      accept: 'application/json',
      apikey: process.env.API_KEY,
    },
  });
  const providers = await res.json();
  // Filter providers where is_active is equal to 1
  const activeProviders = providers.filter(
    (provider) => provider.is_active === 1
  );
  const providerPaths = activeProviders.map(({ npi }) => ({
    params: { id: `${npi}` },
  }));
  return {
    providerPaths,
  };
}

export async function getProviderData(id) {
  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
      apikey: process.env.API_KEY,
    },
  });
  let provider = await res.json();
  let reviews = provider.reviews.filter(
    (r) =>
      r.comment !== 'External Review' &&
      r.platform !== 'Experience' &&
      r.comment !== '' &&
      r.rating !== 0
  );
  provider.reviews = reviews;
  return {
    id: {
      provider,
    },
  };
}
