import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        // tslint:disable-next-line:max-line-length
        new Recipe(
          'A Chicken Recipe',
          'This is simply a test',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoPnDY7xfwRhSqW32rBHVm12GeydJDVN4quhH4KbFbAH8p6IC8GA',
        [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20)
        ]),
        new Recipe(
          'A Steak Recipe',
          'This is simply a test',
          'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
        [
          new Ingredient('meat', 1),
          new Ingredient('tomatoes', 2)
        ])
      ];

      constructor(private slService: ShoppingListService) {}

      getrecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}
