import sql from "better-sqlite3";
import { Meal } from "../app/meals/models/Meal";

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
