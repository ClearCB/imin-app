import { Category } from "../../model/category";
import { Tag } from "../../model/tag";

export abstract class CommonRepositoryPort {

    abstract getAllCategories(): Promise<Category[] | undefined>;
    abstract getAllTags(): Promise<Tag[] | undefined>;

}
