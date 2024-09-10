import dotenv from 'dotenv';
dotenv.config();

import amqp from 'amqplib';
import PlaylistService from './src/PlaylistService.js';
import MailSender from './src/MailService.js';
import Listener from './src/listener.js';

const init = async () => {
    const playlistService = new PlaylistService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:notes', {
        durable: true,
    });

    channel.consume('export_music', listener.listen, { noAck: true });
    console.log('Server running...');
};

init();