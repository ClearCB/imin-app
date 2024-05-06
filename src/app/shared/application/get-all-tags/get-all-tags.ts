import { Tag } from "../../domain/model/tag";
import { CommonRepositoryPort } from "../../domain/port/out/common-repository-port";

export async function getAllTags(commonRepositoryPort: CommonRepositoryPort): Promise<Tag[] | undefined> {

    return await commonRepositoryPort.getAllTags();

}