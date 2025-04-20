import { Module, OnModuleInit } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    const adminUser = await this.prismaService.user.findFirst({
      where: {
        email: 'admin@example.com',
      },
    });

    if (!adminUser) {
      await this.prismaService.user.create({
        data: {
          name: 'Admin',
          email: 'admin@example.com',
          role: 'Admin',
          password: bcrypt.hashSync('password', 10),
        },
      });
    }

    const customerUser = await this.prismaService.user.findFirst({
      where: {
        email: 'customer@example.com',
      },
    });

    if (!customerUser) {
      await this.prismaService.user.create({
        data: {
          name: 'Customer',
          email: 'customer@example.com',
          role: 'Customer',
          password: bcrypt.hashSync('password', 10),
        },
      });
    }
  }
}
