import { api } from "../api/axios";
import type { Product } from "../types/product"

export async function getProducts(): Promise<Product[]> {
  const response = await api.get<Product[]>("/products");

  return response.data;
}

export async function createProduct(data: any) {
  const response = await api.post("/Products", data);

  return response.data;
}

export async function deleteProduct(id: number) {
  await api.delete(`/Products/${id}`);
}

export async function updateProduct({
  id,
  data,
}: {
  id: number;
  data: any;
}) {
  await api.put(`/Products/${id}`, data);
}