import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async armazenar(key: string, value: any) {
    await Storage.set(
      {
        key,
        value: JSON.stringify(value)
      }
    );
  }

  async recuperar(key: string): Promise<{value: any}> {
    const dados = await Storage.get({key});
    return JSON.parse(dados.value);
  }
}