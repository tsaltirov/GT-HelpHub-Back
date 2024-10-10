import { Module } from '@nestjs/common';
import { EmailServiceService } from './email_service.service';
import { EmailServiceController } from './email_service.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.schema';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  controllers: [EmailServiceController],
  providers: [EmailServiceService],
  imports:[MailerModule.forRootAsync({
    useFactory: () => ({
      transport: {
        host: process.env.MAIL_HOST,
        pool:true,
        port: +process.env.MAIL_PORT,
        secure: false, 
        ignoreTLS:true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        
      },
      
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
     
    }),
  }),
  UserModule
  
],
exports: [EmailServiceService], // Exporta el servicio
})
export class EmailServiceModule {}