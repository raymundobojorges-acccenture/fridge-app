import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getIngredients(query) {
  await fakeNetwork(`getIngredients:${query}`);
  let ingredients = await localforage.getItem("ingredients");
  if (!ingredients) ingredients = [];
  if (query) {
    ingredients = matchSorter(ingredients, query, { keys: ["first", "last"] });
  }
  console.log("🚀 ~ file: ingredients.js:11 ~ getIngredients ~ ingredients:", ingredients)
  return ingredients.sort(sortBy("last", "createdAt"));
}

export async function createIngredient() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let ingredient = { id, createdAt: Date.now() };
  let ingredients = await getIngredients();
  ingredients.unshift(ingredient);
  await set(ingredients);
  return ingredient;
}

export async function getIngredient(id) {
  await fakeNetwork(`ingredient:${id}`);
  let ingredients = await localforage.getItem("ingredients");
  let ingredient = ingredients.find(ingredient => ingredient.id === id);
  return ingredient ?? null;
}

export async function updateIngredient(id, updates) {
  await fakeNetwork();
  let ingredients = await localforage.getItem("ingredients");
  let ingredient = ingredients.find(ingredient => ingredient.id === id);
  if (!ingredient) throw new Error("No ingredient found for", id);
  Object.assign(ingredient, updates);
  await set(ingredients);
  return ingredient;
}

export async function deleteIngredients(id) {
  let ingredients = await localforage.getItem("ingredients");
  let index = ingredients.findIndex(ingredient => ingredient.id === id);
  if (index > -1) {
    ingredients.splice(index, 1);
    await set(ingredients);
    return true;
  }
  return false;
}

function set(ingredients) {
  return localforage.setItem("ingredients", ingredients);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}