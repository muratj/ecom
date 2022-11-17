import { Request, Response } from 'express';
import {
  deleteById,
  insertInto,
  selectAll,
  selectById,
  updateById,
} from '../db';
import { ProductDto } from '../dto/product.dto';

export class ProductController {
  async createProduct(req: Request, res: Response) {
    const product = new ProductDto(req.body);
    const newProduct = await insertInto('products', product);
    res.status(201).json(newProduct);
  }

  async getProducts(req: Request, res: Response) {
    const products = await selectAll('products');
    res.json(products);
  }

  async getProduct(req: Request, res: Response) {
    const product = await selectById('products', req.params.id);
    res.json(product);
  }

  async updateProduct(req: Request, res: Response) {
    const product = await selectById('products', req.params.id);
    const updateValues = Object.keys(req.body);
    updateValues.forEach((k) => (product[k] = req.body[k]));
    const productObj = new ProductDto(product);
    const updatedProduct = await updateById(
      'products',
      req.params.id,
      productObj
    );
    res.json(updatedProduct);
  }

  async deleteProduct(req: Request, res: Response) {
    const deleted = await deleteById('products', req.params.id);
    res.json(deleted);
  }
}
