

'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditPage({ params }) {
  const { id } = params;
  const [listing, setListing] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchListing() {
      const res = await fetch(`/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
    }
    fetchListing();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const updated = {
      title: form.get('title'),
      price: Number(form.get('price')),
      status: form.get('status')
    };

    await fetch(`/api/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updated),
      headers: { 'Content-Type': 'application/json' }
    });

    router.push('/dashboard');
  };

  if (!listing) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit Listing</h2>
      <input name="title" defaultValue={listing.title} className="border p-2 w-full mb-4" />
      <input name="price" defaultValue={listing.price} className="border p-2 w-full mb-4" />
      <select name="status" defaultValue={listing.status} className="border p-2 w-full mb-4">
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
}
