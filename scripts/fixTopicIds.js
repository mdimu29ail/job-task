import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // make sure you have .env with MONGODB_URI

const uri = process.env.MONGODB_URI;

async function migrate() {
  await mongoose.connect(uri, { dbName: 'nextjs_topics' });
  console.log('✅ Connected to MongoDB');

  const db = mongoose.connection.db;
  const topics = db.collection('topics');

  const all = await topics.find({}).toArray();
  console.log(`📦 Found ${all.length} topics.`);

  for (const topic of all) {
    if (typeof topic._id === 'string') {
      console.log(`🔄 Converting ID: ${topic._id}`);

      const newId = new mongoose.Types.ObjectId();

      // clone the old document but replace _id
      const newDoc = { ...topic, _id: newId };

      // insert new document
      await topics.insertOne(newDoc);

      // remove old document
      await topics.deleteOne({ _id: topic._id });

      console.log(`✅ Updated ${topic.title || '(no title)'} to ObjectId`);
    }
  }

  console.log('🎉 Migration complete!');
  process.exit(0);
}

migrate().catch(err => {
  console.error('❌ Migration error:', err);
  process.exit(1);
});
