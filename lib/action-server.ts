"use server";

import { MealO } from "@/app/meals/models/MealData";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { promises } from "dns";
import { revalidatePath } from "next/cache";
export default async function shareMeal(prevState: any, formData: FormData) {
  const meal = new MealO(formData);
  const errors = validateMealObject(meal);
  if (errors.length > 0) {
    return { message: errors };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}

function validateMealObject(meal: MealO): string[] {
  const errors = [];

  //inspect  title
  if (
    !meal.title ||
    typeof meal.title !== "string" ||
    meal.title.trim().length === 0
  ) {
    errors.push("Invalid title: must be a non-empty string.");
  }

  // inspect summary
  if (
    !meal.summary ||
    typeof meal.summary !== "string" ||
    meal.summary.trim().length === 0
  ) {
    errors.push("Invalid summary: must be a non-empty string.");
  }

  // inspect instructions
  if (
    !meal.instructions ||
    typeof meal.instructions !== "string" ||
    meal.instructions.trim().length === 0
  ) {
    errors.push("Invalid instructions: must be a non-empty string.");
  }

  // inspect creator
  if (
    !meal.creator ||
    typeof meal.creator !== "string" ||
    meal.creator.trim().length === 0
  ) {
    errors.push("Invalid creator: must be a non-empty string.");
  }

  // inspect creator_email
  if (
    !meal.creator_email ||
    typeof meal.creator_email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(meal.creator_email)
  ) {
    errors.push("Invalid creator_email: must be a valid email address.");
  }

  // inspect image
  if (!meal.image || (meal.image as File).size === 0) {
    errors.push("Invalid image: must be a valid file path.");
  }

  // if there are no errors, return null
  return errors;
}
