import { EntityGetById } from 'src/utils/api-rest';
import { Uri_GetProductoByCategoryIdSubCategoryId } from 'src/api/product/api.product';

export async function ServiceGetProductoByCategoryIdSubCategoryId(categoryId, subCategoryId) {
  return await EntityGetById(Uri_GetProductoByCategoryIdSubCategoryId(categoryId, subCategoryId));
}
 
