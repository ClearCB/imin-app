import { LocalStorageRepositoryPort } from "../../../shared/domain/port/out/local-storage-repository-port";
import { AUTH_CONSTANTS } from "../../auth-constants";

export function logout(localStorageRepository: LocalStorageRepositoryPort): void {

    localStorageRepository.removeItem(AUTH_CONSTANTS.LOCAL_STORAGE_KEYS.ACTIVE_USER_DATA);

}
