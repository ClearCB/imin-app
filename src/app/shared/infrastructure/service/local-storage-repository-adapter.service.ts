import { Injectable } from '@angular/core';
import { LocalStorageRepositoryPort } from '../../domain/port/out/local-storage-repository-port';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepositoryAdapterService extends LocalStorageRepositoryPort {

  constructor() {
    super();
  }

  override getItem(localStorageKey: string): string | null {
    return localStorage.getItem(localStorageKey);
  }

  override setItem(localStorageKey: string, localStoragetValue: string): void {
    localStorage.setItem(localStorageKey, localStoragetValue);
  }

  override removeItem(localStorageKey: string): void {
    localStorage.removeItem(localStorageKey);
  }

}
