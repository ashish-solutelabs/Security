import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { currentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/guard/roles.decorator';
import { Role } from 'src/auth/entities/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput,@currentUser() currentUser:User) {
    return this.productService.create(createProductInput,currentUser);
  }

  @Query(() => [Product], { name: 'product' })
  findAll() {
    return this.productService.findAll();
  }

  // @Query(() => Product, { name: 'product' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.productService.findOne(id);
  // }

  // @Mutation(() => Product)
  // updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
  //   return this.productService.update(updateProductInput.id, updateProductInput);
  // }

  // @Mutation(() => Product)
  // removeProduct(@Args('id', { type: () => Int }) id: number) {
  //   return this.productService.remove(id);
  // }
}
