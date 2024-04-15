export abstract class LocalStorageRepositoryPort {

    abstract getItem(localStorageKey: string): string | null;
    abstract setItem(localStorageKey: string, localStoragetValue: string): void;
    abstract removeItem(localStorageKey: string): void;

}
