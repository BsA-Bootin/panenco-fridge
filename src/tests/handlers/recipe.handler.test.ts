import { MikroORM, RequestContext } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { User } from "../../entities/user.entity";
import ormConfig from "../../orm.config";
import { Fridge } from "../../entities/fridge.entity";
import { Product } from "../../entities/product.entity";
import { expect } from "chai";
import { createUser } from "../../controllers/users/handlers/create.user.handler";
import { deleteAllProducts } from "../../controllers/users/handlers/delete.allproduct.handler";
import { getAllProducts } from "../../controllers/users/handlers/get.allproduct.handler";
import { getProductsLocation } from "../../controllers/users/handlers/get.productsLocation.handler";
import { giftAllProducts } from "../../controllers/users/handlers/gift.allproduct.handler";
import { createRecipe } from "../../controllers/recipes/handlers/create.recipe.handler";
import { Recipe } from "../../entities/recipe.entity";
import { RecipeExtraView } from "../../contracts/recipe.view";
import { deleteRecipe } from "../../controllers/recipes/handlers/delete.recipe.handler";
import { getRecipe } from "../../controllers/recipes/handlers/get.recipe.handler";
import { getAllRecipes } from "../../controllers/recipes/handlers/get.allrecipes.handler";
import { getMissingIngredients } from "../../controllers/recipes/handlers/get.missingIngredients.handler";
import { addIngredientsRecipe } from "../../controllers/recipes/handlers/add.ingredients.handler";
import { nameRecipe } from "../../controllers/recipes/handlers/name.recipe.handler";
import { FridgeProduct } from "../../entities/fridgeProduct.entity";
import { Ingredient } from "../../entities/ingredients.entity";

const userFixtures: User[] = [
    {
        firstName: 'firstTest1',
        lastName: 'lastTest1',
        email: 'test-user+1@panenco.com',
        password: 'Password1',
    }    as User,
    {
        firstName: 'firstTest2',
        lastName: 'lastTest2',
        email: 'test-user+2@panenco.com',
        password: 'Password2',
    }   as User,
    {
        firstName: 'firstTest3',
        lastName: 'lastTest3',
        email: 'test-user+3@panenco.com',
        password: 'Password3',
      } as User,
    ];

const fridgeFixtures: Fridge[] = [
    {
        location: 1,
        capacity: 5,
    }   as Fridge,
    {
        location: 2,
        capacity: 10,
    }   as Fridge,
    ];

const productFixtures: Product[] = [
    {
        name: 'banana',
        size: 3
    }   as Product,
    {
        name: 'apple',
        size: 2
    }   as Product,
    {
        name: 'milk',
        size: 5
    }   as Product,
    {
        name: 'soda',
        size: 2
    }   as Product,
];

const recipeFixtures: Recipe[] = [
    {
        name: 'test name1',
    }   as Recipe,
    {
        name: 'test name2',
    }   as Recipe,
];

describe('Recipe Handler Tests', () => {
    let orm: MikroORM<PostgreSqlDriver>
    let users: User[]
    let fridges: Fridge[]
    let productBodys: {}[] = []
    let products: Product[]
    let recipeBodys: {}[] = []
    let recipes: Recipe[]
    let fridgeProducts: FridgeProduct[]
    let fridgeProductBodies = []
    let ingredients: Ingredient[]
    let ingredientBodies = []
    before(async () => {
        orm = await MikroORM.init(ormConfig);
    })

    beforeEach(async () => {
        await orm.em.execute(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
        await orm.getMigrator().up();
        const em = orm.em.fork();
        users = userFixtures.map((x) => em.create(User, x));
        await em.persistAndFlush(users);
        fridges = fridgeFixtures.map((x) => em.create(Fridge, x));
        await em.persistAndFlush(fridges);
        productBodys = [
            {name: productFixtures[0].name, size: productFixtures[0].size},
            {name: productFixtures[1].name, size: productFixtures[1].size},
            {name: productFixtures[2].name, size: productFixtures[2].size},
            {name: productFixtures[3].name, size: productFixtures[3].size},
        ]
        products = productBodys.map((x) => em.create(Product, x));
        await em.persistAndFlush(products);
        recipeBodys = [
            {name: recipeFixtures[0].name, user: users[1].id}, 
            {name: recipeFixtures[1].name, user: users[1].id},
        ]
        recipes = recipeBodys.map((x) => em.create(Recipe, x));
        await em.persistAndFlush(recipes);
        fridgeProductBodies = [
            {user: users[0].id, fridge: fridges[0].id, product: products[3].id},
            {user: users[1].id, fridge: fridges[1].id, product: products[2].id},
            {user: users[1].id, fridge: fridges[1].id, product: products[1].id},
        ]
        fridgeProducts = fridgeProductBodies.map((x) => em.create(FridgeProduct, x));
        await em.persistAndFlush(fridgeProducts)
        ingredientBodies = [
            {recipe: recipes[0].id, amount: '', product: products[0].id},
            {recipe: recipes[0].id, amount: '', product: products[1].id},
            {recipe: recipes[0].id, amount: '', product: products[2].id},
            {recipe: recipes[0].id, amount: '', product: products[3].id},
        ]
        ingredients = ingredientBodies.map((x) => em.create(Ingredient, x))
        await em.persistAndFlush(ingredients)
    });

    // it('create recipe', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {
    //             name: 'test',
    //             ingredients: ['ing1', 'ing2', 'ing3'], 
    //             user: users[0].id, 
    //         }
    //         const res = await createRecipe(body);
    //         const createdRecipe = await orm.em.findOne(Recipe, {name: body.name})
    //         expect(createdRecipe.id).equal(res.id);            
    //         expect(body.name).equal(res.name);
    //         expect(body.ingredients.toString()).equal(res.ingredients.toString());
    //     });
    // });

    // it('create recipe but name already exists for current user', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {name: recipeFixtures[0].name, ingredients: ["test1", "test2", "test3"],  user: users[0].id}
    //         try {
    //             const res = await createRecipe(body);
    //         } catch (error) {
    //             expect(error.message).equal('Recipe name already exists');
    //             return;
    //         }
    //         expect(true, 'should have thrown an error').false;
    //     });
    // });

    // it('delete recipe', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const initialCount = await orm.em.count(Recipe);
    //         await deleteRecipe(recipes[0].id);
    //         const newCount = await orm.em.count(Recipe);
    //         expect(initialCount - 1).equals(newCount);
    //     });
    // });

    // it('delete recipe given non existing id', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         try {
    //             const res = await deleteRecipe('non-existing');
    //         } catch (error) {
    //             expect(true, 'error thrown').true;
    //             return;
    //         }
    //         expect(true, 'should have thrown an error').false;
    //     })
    // });

    // it('get recipe', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const res = await getRecipe(recipes[0].id);

    //         expect(res.name === recipeFixtures[0].name).true
    //         expect(res.ingredients.toString()).equals(recipeFixtures[0].ingredients.toString())
    //     });
    // });

    // it('get all user recipes', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const res = await getAllRecipes(users[0].id);

    //         expect(res.length).equals(2)
    //         expect(res.some((x) => x.name === recipeFixtures[1].name)).true
    //         expect(res.some((x) => x.ingredients.toString() === recipeFixtures[1].ingredients.toString())).true
    //         expect(res.some((x) => x.id === recipes[1].id)).true
    //         expect(res.some((x) => x.name === recipeFixtures[0].name)).true
    //         expect(res.some((x) => x.ingredients.toString() === recipeFixtures[0].ingredients.toString())).true
    //         expect(res.some((x) => x.id === recipes[0].id)).true
    //     });
    // });

    it('get missing ingredients', async () => {
        await RequestContext.createAsync(orm.em.fork(), async () => {
            const res = await getMissingIngredients(recipes[0].id);

            expect(res.length).equals(2);
            expect(res.some((x) => x.name === 'banana')).true;
            expect(res.some((x) => x.name === 'soda')).true;
        });
    });

    // it('add ingredients to recipe', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {ingredients: ['butter', 'cheese']}
    //         const res = await addIngredientsRecipe(recipes[1].id, body)
            
    //         expect(res.ingredients.some((x) => x === 'butter')).true;
    //         expect(res.ingredients.some((x) => x === 'cheese')).true;
    //     });
    // });

    // it('add ingredients to recipe (trying to add same ingredient)', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {ingredients: ['butter', 'apple']}
    //         const res = await addIngredientsRecipe(recipes[1].id, body)
            
    //         expect(res.ingredients.some((x) => x === 'butter')).true;
    //         expect(res.ingredients.filter(ingredient => ingredient === 'apple').length).equal(1)
    //     });
    // });

    // it('remove ingredients from recipe', async () => {
    //     await RequestContext.createAsync(orm.em.fork(), async () => {
    //         const body = {ingredients: ['banana', 'apple']}
    //         const res = await addIngredientsRecipe(recipes[1].id, body)
            
    //         expect(res.ingredients.some((x) => x !== 'banana')).true;
    //         expect(res.ingredients.some((x) => x !== 'apple')).true;
    //     });
    // });
});
