import { Module, OnModuleInit } from '@nestjs/common';
import { AdminProductsService } from './admin/admin-products.service';
import { AdminProductsController } from './admin/admin-products.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsController } from './public/products.controller';
import { ProductsService } from './public/products.service';

@Module({
  controllers: [AdminProductsController, ProductsController],
  providers: [AdminProductsService, ProductsService],
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
