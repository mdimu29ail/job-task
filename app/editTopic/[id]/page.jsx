// ✅ DO NOT use 'use client' here
import EditTopicForm from '../../../components/EditTopicForm';
import { Toaster } from 'react-hot-toast';

async function getTopicById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/topics`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('❌ Failed to fetch topic:', await res.text());
      return null;
    }

    const data = await res.json();
    return data.topic; // ✅ matches your API response shape
  } catch (error) {
    console.error('🚨 Error fetching topic:', error);
    return null;
  }
}

export default async function EditTopic({ params }) {
  const id = params.id;
  console.log('✅ Editing topic with ID:', id);

  const topic = await getTopicById(id);

  if (!topic) {
    return (
      <p className="text-red-500 text-center mt-10">❌ Topic not found.</p>
    );
  }

  const { title, description } = topic;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-semibold mb-4 text-center">Edit Topic</h1>
      <EditTopicForm id={id} title={title} description={description} />
    </div>
  );
}
