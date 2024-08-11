import slugify from "slugify";
import xss from "xss";
import fs from "fs";

interface MealData {
  slug?: string;
  id?: string;
  title: string;
  creator: string;
  creator_email: string;
  summary: string;
  instructions: string;
  image: File;
}

export class MealO implements MealData {
  slug?: string;
  id?: string;
  title: string;
  creator: string;
  creator_email: string;
  summary: string;
  instructions: string;
  image: File;
  constructor(formData: FormData) {
    this.title = formData.get("title") as string;
    this.summary = formData.get("summary") as string;
    this.instructions = formData.get("instructions") as string;
    this.image = formData.get("image") as File; // 这里假设 image 是一个文件对象
    this.creator = formData.get("name") as string;
    this.creator_email = formData.get("email") as string;
  }

  // generate file name
  generateFilename(): string {
    this.slug = slugify(this.title, { lower: true });
    const extension = this.image.name.split(".").pop();
    const random = Math.random().toString(36).substring(2, 15);
    return `${this.slug + random}.${extension}`;
  }

  // prevent XSS attacks
  sanitizeInstructions(): void {
    this.instructions = xss(this.instructions);
  }

  // get image buffer
  async getImageBuffer(): Promise<Buffer> {
    return Buffer.from(await this.image.arrayBuffer());
  }
}
