import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { ModalController } from '@ionic/angular';

interface Senha {
  id: number;
  nome: string;
  login: string;
  senha: string;
}


@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.page.html',
  styleUrls: ['./modal-form.page.scss'],
})
export class ModalFormPage implements OnInit {
  public senha: Senha = {} as any;
  public senhas: Senha[] = [];

  constructor(private storage: StorageService, public modalForm: ModalController) {
    this.storage.recuperar('senhas').then((data: any) => {
      if (data != null) {
        this.senhas = data;
      } else {
        this.senhas = [];
      }
    });
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalForm.dismiss();
  }

  adicionar() {
    this.senha.id = new Date().getTime();
    this.senhas.push(this.senha);
    console.log(this.senhas);
    this.senha = {} as any;

    this.storage.armazenar('senhas', this.senhas);
    this.dismissModal();
  }

  excluir(id: number) {
    this.senhas = this.senhas.filter((item) => {
      return item.id !== id;
    });
  }

}
