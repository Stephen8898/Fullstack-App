const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
let env = require('../env');

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

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: env.key.mailTrap.user,
      pass: env.key.mailTrap.pass
    }
  });



amqp.connect('amqp://localhost', (err, connection) => {
    if (err) throw err;

    connection.createChannel((err, channel)  => {
        if (err) throw err;

        let queue = 'logs';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        // channel.assertQueue('', {
        //     exclusive: true
        // }, (err, q) => {
        //     if (err) throw err;

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        //     channel.bindQueue(q.queue, exchange, '');

            channel.consume(queue, msg => {
                if (msg.content){
                    console.log(" [x] Received %s", msg.content.toString());
                }

                let message = {
                    from: "589598dfa1-d50b60@inbox.mailtrap.io",
                    to: "receiver@sender.com", // For users that has signed up, u passs in their email 
                    subject: "Message title",
                    text: msg.content.toString(),
                    // html: "<p>HTML version of the message</p>"
                };
             


                transport.sendMail(message, (err, info) =>{
                    if (err) {
                        console.error(err.stack);
                        // put the failed message item back to queue
                        return channel.nack(message);
                    }
                    console.log('Delivered message %s', info.messageId);
                    // remove message item from the queue
                    channel.ack(message);
                })
            
            }
            , {
                noAck: true
            }
            );
        });

});