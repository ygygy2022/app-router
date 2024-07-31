interface MealsSomeSlugProps {
  params: {
    slug: string;
  };
}

export default function MealsSomeSlug({ params }: MealsSomeSlugProps) {
  return <h1>{params.slug}</h1>;
}
