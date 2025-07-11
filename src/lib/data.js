
export let listings = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Listing ${i + 1}`,
  price: (Math.random() * 100).toFixed(2),
  status: 'Pending',
}));

export const updateListing = (id, updates) => {
  const index = listings.findIndex((item) => item.id === id);
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updates };
  }
};
