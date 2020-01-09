import { Field, ObjectType, InputType, ArgsType, Int, registerEnumType, createUnionType, UseMiddleware } from 'type-graphql';
import { Min, Max, MaxLength, Length, ArrayMaxSize } from 'class-validator';
import { IsLongerThan } from '../../validation/customValidationDecorators';
import { NumberInterceptor } from '../middlewares/number-Interceptor';
import { LogAccessMiddleware } from '../middlewares/log-access';

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

registerEnumType(Direction, {
  name: 'Direction', // this one is mandatory
  description: '代表方向的枚举类型', // this one is optional
});

@ObjectType()
export class Movie {
  @Field()
  name: string;

  @Field()
  rating: number;
}

@ObjectType()
export class Actor {
  @UseMiddleware(LogAccessMiddleware)
  @Field()
  name: string;

  @UseMiddleware(NumberInterceptor(3))
  @Field(() => Int, { nullable: true })
  age: number;
}
export const SearchResultUnion = createUnionType({
  description: '联合类型',
  name: 'SearchResult', // the name of the GraphQL union
  types: () => [ Movie, Actor ], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: value => {
    console.log(value);
    if ('rating' in value) {
      return 'Movie'; /// return Movie; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('age' in value) {
      return 'Actor'; // or the schema name of the type as a string
    }
    return undefined;
  },
});

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

  @Field(() => [ Int ], {
    description: '评级',
  })
  ratings: number[];

  @Field()
  direction: string;
}

@ObjectType({ description: 'User 对象' })
export class User {
  @Field()
  name: string;
  @Field({ nullable: true })
  description?: string;
}
@InputType({ description: 'User add 对象' })
export class UserInput {
  @Field()
  name: string;
}

@ObjectType({ description: 'Persion 对象' })
export class Persion {
  @Field()
  myName: string;
  @Field({ nullable: true })
  myDescription?: string;
}
@InputType({ description: 'Persion add 对象' })
export class PersionInput {
  @Field()
  myName: string;
}

@ArgsType()
class PaginationArgs {
  @Field(() => Int)
  @Min(0)
  skip: number = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}

@ArgsType()
export class RecipesArgs extends PaginationArgs {

  @Field(() => Direction) // it's very important
  direction?: Direction;

  @Field({ nullable: true })
  title: string;

  @IsLongerThan('title', {
    /* you can also use additional validation options, like "groups" in your custom validation decorators. "each" is not supported */
    message: 'Text字段必须长于title字段',
  })
  @Field()
  text: string;
}

@InputType({ description: 'Recipe add 对象' })
export class NewRecipeInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(() => [ String ])
  @ArrayMaxSize(30)
  ingredients: string[];
}
