
export default async function handler(req, res) {
  try {
    const { npi, page } = req.query;

    // Fetch data from the external API using the API key securely from environment variables
    const apiKey = process.env.API_KEY;
    const apiUrl = `${process.env.API_URL}npi2/${npi}?page=${page + 1}&pageSize=10`;
    const apiHeaders = {
      accept: 'application/json',
      apikey: apiKey,
    };

    const apiResponse = await fetch(apiUrl, { headers: apiHeaders });

    if (!apiResponse.ok) {
      throw new Error('Failed to fetch data from the external API');
    }

    const data = await apiResponse.json();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
}
