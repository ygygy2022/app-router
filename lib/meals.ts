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
      row.creator
    );
  });

  return meals;
}
