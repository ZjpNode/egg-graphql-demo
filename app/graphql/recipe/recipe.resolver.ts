import { Resolver, Query } from 'type-graphql';
import { Recipe } from './recipe.type';
import { RecipeService } from './recipe.service';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private recipeService: RecipeService) {}

  @Query(() => Recipe, { nullable: true })
  async recipe(): Promise<Recipe> {
    return this.recipeService.getRecipe();
  }
}
