import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';

/*
import { ContentController } from './controllers/content.controller';
import { ContentsService } from './services/content/content';
*/
// import { Content } from './entity/content.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        port: 3306,
        username: 's0vurz0ljyewe5dc',
        password: 'doy2ghlcqnfsggfz',
        database: 'md22lga4oy6r8ho9',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    ContentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
