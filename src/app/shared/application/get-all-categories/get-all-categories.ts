import { Category } from "../../domain/model/category";
import { CommonRepositoryPort } from "../../domain/port/out/common-repository-port";

export async function getAllCategories(commonRepositoryPort: CommonRepositoryPort): Promise<Category[] | undefined> {

    return await commonRepositoryPort.getAllCategories();

}