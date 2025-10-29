'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

export default function AddTopicForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title || !description) {
      toast.error('Both fields are required');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        toast.success('Topic added successfully!');
        router.refresh();
        setTitle('');
        setDescription('');
      } else {
        toast.error('Failed to add topic');
      }
    } catch (error) {
      console.error('Error adding topic:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-5">
        <input
          type="text"
          placeholder="Topic Title"
          className="border border-slate-500 px-8 py-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic Description"
          className="border border-slate-500 px-8 py-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-2 font-bold w-fit">
          Add Topic
        </button>
      </form>
    </>
  );
}
