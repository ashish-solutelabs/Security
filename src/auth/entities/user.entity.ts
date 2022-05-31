import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';


@ObjectType()
@Entity({
  name: "user"
})
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id:number

  @Field()
  @Column()
  email:string

  @Field()
  @Column()
  firstname:string

  @Field()
  @Column()
  lastname:string

  @Field()
  @Column()
  password:string

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role

  @Field(type=>[Product])
  @OneToMany(type => Product, product => product.user, { eager: true })
  products: Product[];
}

