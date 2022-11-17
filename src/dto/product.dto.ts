export class ProductDto {
  brand: string;
  model: string;
  image: string;
  description: string;

  constructor(body: any) {
    this.brand = body.brand;
    this.model = body.model;
    this.image = body.image;
    this.description = body.description;
  }
}
