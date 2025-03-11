const amqp = require("amqplib");
const ActivityLogService = require("../Services/ActivityLogService");


const consumeMessage = async () => {
    try{
        //connect to rabbitmq
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        //Check queue exists
        await channel.assertQueue(process.env.QUEUE_NAME, { durable: true })
        console.log(`✅ Listening for messages on queue: ${process.env.QUEUE_NAME}`);

        //Consume messages
        channel.consume(process.env.QUEUE_NAME, async (msg) =>{
            if(msg != null){
                try {
                    const logData = JSON.parse(msg.content.toString());
                    console.log("📥 Received log event:", logData);

                    // Call the logging service based on event type
                    if (logData.type === "CREATED") {
                        await ActivityLogService.logCreation(logData.jobApplication);
                    } else if (logData.type === "UPDATED") {
                        await ActivityLogService.logUpdate(logData.jobApplication.oldJobData, logData.jobApplication.newJobData);
                    } else if (logData.type === "DELETED") {
                        await ActivityLogService.logDeletion(logData.jobApplication);
                    }
                    // Acknowledge message
                    channel.ack(msg);
                } catch(error) {
                    console.error("❌ Error processing message:", error);
                }
            }
        })
    } catch(error) {
        console.error("❌ RabbitMQ Consumer Error:", error);
    }
};

module.exports = consumeMessage;