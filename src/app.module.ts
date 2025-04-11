import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { InvestmentsController } from './investments/investments.controller';
import { InvestmentsModule } from './investments/investments.module';
import { InterestsController } from './interests/interests.controller';
import { InterestsModule } from './interests/interests.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',         
      port: 5432,               
      username: 'postgres',     
      password: 'passer', 
      database: 'testdb',        
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,         
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    InvestmentsModule,
    InterestsModule, 
  ],
  controllers: [AppController, InvestmentsController, InterestsController],
  providers: [AppService],
})
export class AppModule {}
