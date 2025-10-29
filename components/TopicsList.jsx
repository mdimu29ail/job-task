// import Link from 'next/link';
// import RemoveBtn from './RemoveBtn';
// import { HiPencilAlt } from 'react-icons/hi';

// const getTopics = async () => {
//   try {
//     const res = await fetch(
//       'http://localhost:3000/api/topics',
//       {
//         cache: 'no-store',
//       }
//     );

//     if (!res.ok) {
//       throw new Error('Failed to fetch topics');
//     }

//     return res.json();
//   } catch (error) {
//     console.log('Error loading topics: ', error);
//   }
// };

// export default async function TopicsList() {
//   const { topics } = await getTopics();

//   return (
//     <>
//       {topics.map(t => (
//         <div
//           key={t._id}
//           className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
//         >
//           <div>
//             <h2 className="font-bold text-2xl">{t.title}</h2>
//             <div>{t.description}</div>
//           </div>

//           <div className="flex gap-2">
//             <RemoveBtn id={t._id} />
//             <Link href={`/editTopic/${t._id}`}>
//               <HiPencilAlt size={24} />
//             </Link>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }

// components/TopicsList.jsx
import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';

export default function TopicsList({ topics }) {
  if (!topics || !topics.length) {
    return <p className="text-center mt-5 text-red-500">No topics found.</p>;
  }

  return (
    <>
      {topics.map(t => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <p>{t.description}</p>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />

            <Link
              href={`/editTopic/${t._id}`}
              className="text-blue-600 flex items-center gap-1"
            >
              <HiPencilAlt size={24} /> Edit
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
