"use server";

import { MealO } from "@/app/meals/models/MealData";
import { saveMeal } from "./meals";

export default async function shareMeal(formData: FormData) {
  const meal = new MealO(formData);
  await saveMeal(meal);
}
