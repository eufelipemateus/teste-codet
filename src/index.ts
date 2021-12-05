import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Content } from './entity/content.entity';

createConnection()
  .then(async (connection) => {
    console.log('Inserting a new content into the database...');
    const content = new Content();
    content.title = 'Timber';
    content.duration = 3000;
    content.file = 'http://example.com/etc';
    await connection.manager.save(content);
    console.log('Saved a new user with id: ' + content.id);

    console.log('Loading users from the database...');
    const contents = await connection.manager.find(Content);
    console.log('Loaded users: ', contents);

    console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));
