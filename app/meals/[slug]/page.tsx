import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
interface MealsSomeSlugProps {
  params: {
    slug: string;
  };
}
export async function generateMetadata({ params }: MealsSomeSlugProps) {
  const meal = await getMeal(params.slug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealsSomeSlug({ params }: MealsSomeSlugProps) {
  const meal = await getMeal(params.slug);
  if (!meal) {
    notFound();
  }
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt="Description of the image" fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions.replace(/\n/g, "<br>"),
          }}
        ></p>
      </main>
    </>
  );
}
