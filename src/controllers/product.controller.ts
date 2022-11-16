import { Request, Response } from 'express';
import {
  deleteById,
  insertInto,
  selectAll,
  selectById,
  updateById,
} from '../db';

export class ProductController {
  async createProduct(req: Request, res: Response) {
    const newProduct = await insertInto('products', req.body);
    res.json(newProduct);
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
    const updatedProduct = await updateById(
      'products',
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  }

  async deleteProduct(req: Request, res: Response) {
    const deleted = await deleteById('products', req.params.id);
    res.json(deleted);
  }
}
