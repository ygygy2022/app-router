interface MealsSomeSlugProps {
  params: {
    slug: string;
  };
}

export default function MealsSomeSlug({ params }: MealsSomeSlugProps) {
  return (
    <>
      <header></header>
      <h1>{params.slug}</h1>
    </>
  );
}
