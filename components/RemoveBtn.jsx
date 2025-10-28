'use client';

import { HiTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const handleRemove = async () => {
    if (!confirm('Are you sure you want to delete this topic?')) return;

    try {
      const res = await fetch(
        `https://job-task-git-main-md-imus-projects.vercel.app//api/topics/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) router.refresh();
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
      <HiTrash size={24} />
    </button>
  );
}
