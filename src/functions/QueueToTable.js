const { app, output } = require('@azure/functions');

const tableOutput = output.table({
    tableName: 'MessagesTable',
    connection: 'AzureWebJobsStorage',
})

app.storageQueue('QueueToTable', {
    queueName: 'outqueue',
    connection: 'AzureWebJobsStorage',
    extraOutputs: [tableOutput],
    handler: (queueItem, context) => {
        context.log('Message received from queue :', queueItem);

        const entity = {
            PartitionKey: 'messages',
            RowKey: context.triggerMetadata.id,
            Content: queueItem,
        };

        context.extraOutputs.set(tableOutput, entity)
    },
});
