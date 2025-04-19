import { Module, OnModuleInit } from '@nestjs/common';
import { AdminProductsService } from './admin/admin-products.service';
import { AdminProductsController } from './admin/admin-products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AdminProductsController],
  providers: [AdminProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private readonly adminProductsService: AdminProductsService,
    private readonly prismaService: PrismaService,
  ) {}

  async onModuleInit() {
    await this.prismaService.product.deleteMany();

    const products = Array.from({ length: 10 }, (_, i) => ({
      name: `Product ${i}`,
      slug: `product-${i}`,
      description: `Product ${i} description`,
      price: Math.floor(Math.random() * 100),
    }));

    for (const product of products) {
      await this.adminProductsService.create(product);
    }
  }
}
