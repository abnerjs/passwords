import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';

interface Senha {
  id: number;
  nome: string;
  login: string;
  senha: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public senha: Senha = {} as any;
  public senhas: Senha[] = [];

  constructor(private storage: StorageService) {
    this.storage.recuperar('senhas').then((data: any) => {
      if (data != null) {
        this.senhas = data;
      } else {
        this.senhas = [];
      }
    });
  }

  adicionar() {
    this.senha.id = new Date().getTime();
    this.senhas.push(this.senha);
    console.log(this.senhas);
    this.senha = {} as any;

    this.storage.armazenar('senhas', this.senhas);
  }

  excluir(id: number) {
    this.senhas = this.senhas.filter((item) => {
      return item.id !== id;
    });
  }
}
