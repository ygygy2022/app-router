export class Meal {
  id?: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email?: string;
  instructions: string;
  constructor(
    id: string,
    title: string,
    slug: string,
    image: string,
    summary: string,
    creator: string,
    creator_email: string,
    instructions: string
  ) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.image = image;
    this.summary = summary;
    this.creator = creator;
    this.creator_email = creator_email;
    this.instructions = instructions;
  }
}
