import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {

    const imc = this.weight / (this.height * this.height);

    let mensagem = '';
    if(imc < 18.5) {
      mensagem = 'MAGREZA';
    } else if (imc <= 24.9) {
      mensagem = 'NORMAL';
    } else if (imc <= 29.9) {
      mensagem = 'SOBREPESO';
    } else if (imc <= 39.9) {
      mensagem = 'OBESIDADE';
    } else {
      mensagem = 'OBESIDADE GRAVE';
    }
    this.showMessage(`IMC = ${imc.toFixed(2)}, e você está classificado em ${mensagem}!`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'light',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
