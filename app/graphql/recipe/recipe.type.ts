import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Recipe 对象' })
export class Recipe {
  @Field({ nullable: true })
  title: string;

  @Field({
    nullable: true,
    description: '描述',
  })
  description?: string;

  @Field({
    nullable: true,
    description: '创建时间',
  })
  createdAt: Date;
}
