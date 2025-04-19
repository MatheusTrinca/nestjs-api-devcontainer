import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
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
      await this.productsService.create(product);
    }
  }
}
