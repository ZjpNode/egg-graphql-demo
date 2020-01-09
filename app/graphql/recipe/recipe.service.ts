import { Service } from 'typedi';
import { plainToClass } from 'class-transformer';
import { User, Recipe, RecipesArgs, NewRecipeInput, Direction, Movie, Actor } from './recipe.type';

@Service()
export class RecipeService {
  getRecipe(): Recipe {
    return {
      title: 'hello~*',
      description: 'desc......',
      createdAt: new Date(),
      ratings: [ 1, 2, 4, 5 ],
      direction: Direction.RIGHT,
    };
  }
  findAll({ skip, take, direction }: RecipesArgs): Recipe[] {
    console.log(skip, take, direction);
    return [
      {
        title: 'hello~1',
        description: 'desc1......',
        createdAt: new Date(),
        ratings: [ 1, 2, 4, 5 ],
        direction: Direction.DOWN,
      },
      {
        title: 'hello~2',
        description: 'desc2......',
        createdAt: new Date(),
        ratings: [ 11, 24, 4, 5 ],
        direction: Direction.UP,
      },
    ];
  }
  addNew({ data, user }: { data: NewRecipeInput, user: User }) {
    return new Promise<Recipe>(res => {
      setTimeout(() => {
        res({
          title: data.title,
          description: data.description,
          createdAt: new Date(),
          ratings: [ 1, 25, 4, 15 ],
          direction: Direction.LEFT,
        });
        console.log(user);
      }, 500);
    });
  }
}

@Service()
export class MoviesService {
  findAll(phrase: string) {
    // const movie: Partial<Movie> = { name: phrase, rating: 1123 };
    // return plainToClass(Movie, movie);
    const movie = new Movie();
    movie.name = phrase;
    movie.rating = 1123;
    return [ movie ] ;
  }
}

@Service()
export class ActorsService {
  findAll(phrase: string) {
    const actor: Partial<Actor> = { name: phrase, age: 28 };
    return [ plainToClass(Actor, actor) ];
  }
}
