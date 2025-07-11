'use client';

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/listings');
      const data = await res.json();
      setListings(data);
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listings.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(listings.length / itemsPerPage);

  const updateStatus = (id, newStatus) => {
    const updated = listings.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setListings(updated);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setUpdatedTitle(item.title);
    setUpdatedPrice(item.price);
  };

  const handleUpdate = () => {
    const updated = listings.map(item =>
      item.id === editItem.id ? { ...item, title: updatedTitle, price: updatedPrice } : item
    );
    setListings(updated);
    setEditItem(null); // close modal
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard Listings</h1>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2 border">{item.id}</td>
              <td className="p-2 border">{item.title}</td>
              <td className="p-2 border">${item.price}</td>
              <td className="p-2 border">{item.status}</td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => updateStatus(item.id, 'Approved')} className="text-green-600">Approve</button>
                <button onClick={() => updateStatus(item.id, 'Rejected')} className="text-red-600">Reject</button>
                <button onClick={() => handleEdit(item)} className="text-blue-600">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Listing</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="border p-2 rounded"
              />
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                className="border p-2 rounded"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setEditItem(null)} className="text-gray-600">Cancel</button>
                <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
