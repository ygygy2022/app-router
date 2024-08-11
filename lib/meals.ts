import sql from "better-sqlite3";
import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";
import { Meal } from "../app/meals/models/Meal";
import { MealO } from "@/app/meals/models/MealData";

const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  // Get all rows from the meals table
  const rows = db.prepare("SELECT * FROM meals").all();

  // Map the rows to Meal objects
  const meals: Meal[] = rows.map((row: any) => {
    return new Meal(
      row.id,
      row.title,
      row.slug,
      row.image,
      row.summary,
      row.creator,
      row.creator_email,
      row.instructions
    );
  });
  //throw new Error("Not implemented");
  return meals;
}

export async function getMeal(slug: string) {
  try {
    const row = db
      .prepare("SELECT * FROM meals WHERE slug = ?")
      .get(slug) as Meal;
    if (row) {
      const creator_email = row.creator_email || ""; // Provide a default value if row.creator_email is undefined
      const id = row.id || ""; // Provide a default value if row.id is undefined
      const meal = new Meal(
        id,
        row.title,
        row.slug,
        row.image,
        row.summary,
        row.creator,
        creator_email,
        row.instructions
      );
      return meal;
    } else {
      throw new Error("No meal found");
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function saveMeal(meal: MealO) {
  meal.sanitizeInstructions();
  const filename = meal.generateFilename();
  const imageBuffer = await meal.getImageBuffer();
  const image = `/images/${filename}`;
  const stream = fs.createWriteStream(`public/${image}`);
  stream.write(imageBuffer, (error) => {
    if (error) {
      throw new Error("Failed to save image");
    }
  });
  // Save meal to database
  // Prepare the meal object - this is the object that will be inserted into the database
  // a plain object with the properties of the meal object
  const mealObject = {
    title: meal.title,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
    image: image, // use path to image
    slug: slugify(meal.title, { lower: true }),
  };
  db.prepare(
    `INSERT INTO meals(title, summary, instructions, creator, creator_email, image,slug) 
    VALUES(
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug)`
  ).run(mealObject);
  stream.end();
}
