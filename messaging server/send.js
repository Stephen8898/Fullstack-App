const amqp = require('amqplib/callback_api');

/*
RabbitMQ is a message broker: it accepts and forwards messages. 
You can think about it as a post office: 
when you put the mail that you want posting in a post box, 
you can be sure that Mr. or Ms. Mailperson will eventually deliver the mail to your recipient. 
In this analogy, RabbitMQ is a post box, a post office and a postman.

Producing means nothing more than sending. A program that sends messages is a producer :
*/



//Connect to the rabbitmq server


amqp.connect('amqp://localhost', (err, connection) => {
    if(err) throw err;

    //This channel is where the api resides that accomplish most of the work
    connection.createChannel((err, channel)=> {
        //To send things a queue must be declared

/* A queue is the name for a post box which lives inside RabbitMQ. 
Although messages flow through RabbitMQ and your applications, 
they can only be stored inside a queue. */


        if (err) throw err;

        let queue = 'hello';
        let msg = 'hello world';

        // Declaring a queue is idempotent - it will only be created if it doesn't exist already
        channel.assertQueue(queue, {
            durable: false
          });

        channel.sendToQueue(msg, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });


    //closes the connection and exits
    setTimeout(()=>{
        connection.close();
        process.exit(0);
    }, 500);

})