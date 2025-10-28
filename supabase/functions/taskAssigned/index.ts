import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

serve(async req => {
  const payload = await req.json();
  const record = payload.record;

  console.log('🆕 New Task Assigned:');
  console.log(`Title: ${record.title}`);
  console.log(`Assigned To: ${record.assigned_to}`);

  // Optional: Send an email (you can integrate Resend or SendGrid here)
  // await sendEmail(record.assigned_to, `You have a new task: ${record.title}`);

  return new Response('Task notification processed', { status: 200 });
});
