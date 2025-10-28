import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch topics');

    const data = await res.json();
    return Array.isArray(data) ? data : data.topics || [];
  } catch (error) {
    console.error('Error loading topics:', error);
    return [];
  }
};

export default async function TopicsList() {
  const topics = await getTopics();

  if (!Array.isArray(topics) || topics.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-5">No topics found.</div>
    );
  }

  return (
    <>
      {topics.map(t => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <p className="text-gray-600">{t.description}</p>
          </div>

          <div className="flex gap-2 items-center">
            <RemoveBtn id={t._id} />
            <Link
              href={`/editTopic/${t._id}`}
              className="text-blue-500 hover:text-blue-700"
            >
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
