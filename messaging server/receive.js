const amqp = require('amqplib/callback_api');

/*
RabbitMQ is a message broker: it accepts and forwards messages. 
You can think about it as a post office: 
when you put the mail that you want posting in a post box, 
you can be sure that Mr. or Ms. Mailperson will eventually deliver the mail to your recipient. 
In this analogy, RabbitMQ is a post box, a post office and a postman.

Consuming has a similar meaning to receiving. A consumer is a program that mostly waits to receive messages:
*/

//Publisher publishes a single messsage
//we'll keep the consumer running to listen for messages and print them out

amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;

    connection.createChannel((err, channel)  => {
        if (err) throw err;

        let queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });

});