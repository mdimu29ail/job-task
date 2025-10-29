// import TopicsList from '../components/TopicsList';

// export default function Home() {
//   return (
//     <main className="max-w-3xl mx-auto py-8">
//       <TopicsList />
//     </main>
//   );
// }
// app/page.jsx or src/app/page.jsx
import TopicsList from '../components/TopicsList';
import connectMongoDB from '../libs/mongodb';
import Topic from '../models/topic';

export const dynamic = 'force-dynamic'; // important

export default async function HomePage() {
  await connectMongoDB();
  const topics = await Topic.find().sort({ createdAt: -1 });

  // console.log(topics); // debug: check data

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Topics List</h1>
      <TopicsList topics={topics} />
    </div>
  );
}
