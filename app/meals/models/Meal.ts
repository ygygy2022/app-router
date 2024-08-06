export class Meal {
  id?: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  constructor(
    id: string,
    title: string,
    slug: string,
    image: string,
    summary: string,
    creator: string
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.image = image;
    this.summary = summary;
    this.creator = creator;
  }
}
