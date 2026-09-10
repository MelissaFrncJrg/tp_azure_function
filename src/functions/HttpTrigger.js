const { app, output } = require('@azure/functions');

const queueOutput = output.storageQueue({
  queueName: 'outqueue',
  connection: 'AzureWebJobsStorage',
})

app.http('HttpTrigger', {
  methods: ['POST'],
  authLevel: 'anonymous',
  extraOutputs: [queueOutput],
  handler: async (request, context) => {
   const body = await request.text();
   context.log(`Message received: ${body}`);
   context.extraOutputs.set(queueOutput, body);
   return { body: 'Message published in queue.' };
  }
});
