export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token, my friend' });
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send(err);
  }
}
