import { Service } from 'typedi';
// import upperCase from '../../directive/upperCase';

@Service()
export class RecipeService {
  getRecipe() {
    return {
      title: 'hello~*',
      description: 'desc......',
      createdAt: new Date(),
    };
  }
}
