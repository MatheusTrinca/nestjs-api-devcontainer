import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(dto: ProductQueryDto) {
    const { name, page = 1, limit = 15 } = dto;
    return this.prismaService.product.findMany({
      ...(name && {
        where: {
          name: {
            contains: name,
          },
        },
      }),
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(slug: string) {
    const product = await this.prismaService.product.findFirst({
      where: {
        slug,
      },
    });

    if (!product) {
      throw new NotFoundError('Product', slug, 'slug');
    }

    return product;
  }
}
