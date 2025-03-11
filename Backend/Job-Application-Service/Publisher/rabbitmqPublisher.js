const amqp = require("amqplib");

const sendLogEvent = async(logData) =>{
    try{
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });

        //send message
        channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(JSON.stringify(logData)), {
            persistent: true,
        });
        console.log("📤 Log event sent:", logData);
        setTimeout(() => {
            connection.close();
          }, 500);
    } catch (error) {
        console.error("❌ RabbitMQ Publisher Error:", error);
    }
};

module.exports = sendLogEvent;