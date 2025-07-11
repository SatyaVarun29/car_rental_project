export async function GET() {
  const listings = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Listing ${i + 1}`,
    price: (Math.random() * 100).toFixed(2),
    status: 'Pending',
  }));

  return Response.json(listings);
}
