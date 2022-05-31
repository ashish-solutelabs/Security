import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({
    name: "product"
})
export class Product {

    @Field()
    @PrimaryGeneratedColumn()
    p_id:number
  
    @Field()
    @Column()
    p_name:string
  
    @Field()
    @Column()
    p_price:string
    
    @ManyToOne(type => User, user => user.products, { eager: false })
    @JoinColumn()
    user: User;

    @Column()
    userId: number;
}
