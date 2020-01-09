/*
 * @Author       : jiapeng.Zheng
 * @Date         : 2020-01-02 16:38:02
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2020-01-09 16:57:50
 * @Description  : resolver
 */
import { FieldResolver, Resolver, Query, Mutation, Args, Arg, Ctx, Root, Int, ClassType } from 'type-graphql';
import { Persion, PersionInput, User, UserInput, Recipe, RecipesArgs, NewRecipeInput, SearchResultUnion } from './recipe.type';
import { RecipeService, MoviesService, ActorsService } from './recipe.service';
import { ValidateArgs } from '../decorators/validate-args';
import CurrentUser from '../decorators/current-user';

function createBaseResolver<T>(objectTypeCls: ClassType<T>) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    protected items: T[] = [];

    @Query(() => [ objectTypeCls ], { name: `getAll${objectTypeCls.name.toLocaleLowerCase()}` })
    async getAll(@Arg('first', () => Int) first: number): Promise<T[]> {
      return this.items.slice(0, first);
    }
  }

  return BaseResolver;
}

const UserBaseResolver = createBaseResolver(User);

@Resolver(() => User)
export class UserResolver extends UserBaseResolver {
  @Mutation()
  addUser(@Arg('input') userInput: UserInput): User {
    const user = new User();
    user.name = userInput.name;
    user.description = `${userInput.name} DES`;
    this.items.push(user);
    return user;
  }
}

const PersionBaseResolver = createBaseResolver(Persion);

@Resolver(() => Persion)
export class PersionResolver extends PersionBaseResolver {
  @Mutation()
  addPersion(@Arg('input') persionInput: PersionInput): Persion {
    const persion = new Persion();
    persion.myName = persionInput.myName;
    persion.myDescription = `${persionInput.myName} DES`;
    this.items.push(persion);
    return persion;
  }
}

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) { }

  @FieldResolver(() => Number)
  averageRating(@Root() recipe: Recipe) {
    const ratingsSum = recipe.ratings.reduce((a, b) => a + b, 0);
    return recipe.ratings.length ? ratingsSum / recipe.ratings.length : null;
  }

  @Query(() => Recipe, { nullable: true })
  async recipe(): Promise<Recipe> {
    return this.recipeService.getRecipe();
  }

  @Query(() => [ Recipe ], { nullable: true })
  recipes(@Args() { skip, take, direction, title, text }: RecipesArgs) {
    return this.recipeService.findAll({ skip, take, direction, title, text });
  }

  @Query(() => [ Recipe ], { nullable: true })
  @ValidateArgs(RecipesArgs)
  recipesByValidateArgs(
    @Args({ validate: false }) // disable built-in validation here
    { skip, take, direction, title, text }: RecipesArgs) {
    return this.recipeService.findAll({ skip, take, direction, title, text });
  }
  @Query(() => [ Recipe ], { nullable: true })
  // @ValidateArgs(RecipesArgs)
  recipesDisableValidateArgs(
    @Args({ validate: false }) // disable built-in validation here
    { skip, take, direction, title, text }: RecipesArgs) {
    return this.recipeService.findAll({ skip, take, direction, title, text });
  }

  @Mutation(() => Recipe)
  // @Authorized()
  addRecipe(
    @Arg('newRecipeData2') newRecipeData: NewRecipeInput,
    @Ctx('user') user: User,
  ): Promise<Recipe> {
    return this.recipeService.addNew({ data: newRecipeData, user });
  }
}

@Resolver()
export class SearchResolver {
  constructor(private moviesService: MoviesService, private actorsService: ActorsService) { }
  @Query(() => [ SearchResultUnion ])
  search(@Arg('phrase') phrase: string, @CurrentUser() currentUser): Array<typeof SearchResultUnion> {

    console.log(`User "${currentUser.name}" queried for recipes!`);
    const movies = this.moviesService.findAll(phrase);
    const actors = this.actorsService.findAll(phrase);
    console.log(phrase, movies, actors);
    return [ ...movies, ...actors ];
  }
}
