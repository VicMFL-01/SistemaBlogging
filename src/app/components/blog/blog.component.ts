import { Component } from '@angular/core';
import { Notice } from '../../interfaces/notice.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  providers: [DatePipe]
})
export class BlogComponent {

  constructor(private datePipe: DatePipe) {

  }

  inputsForm: any = {
    titulo: "titulo de noticia",
    imagen: "imagen url",
    notice: "cuerpo de noticia",
    date: "fecha de publicación"
  };

  newNotice:Notice = {
      titulo:"",
      imagen: "",
      notice: "",
      date: ""
  }

  noticias:Notice[] = [
    {
      titulo:"Halo Infinite",
      imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1708091/capsule_616x353.jpg?t=1706638660",
      notice: "Cuando se pierde toda esperanza y el destino de la humanidad pende de un hilo, el Jefe Maestro está listo para enfrentarse al enemigo más despiadado que jamás haya enfrentado. Colócate la armadura del mayor héroe de la humanidad para disfrutar de una aventura épica y explorar la escala masiva del anillo de Halo.",
      date: new Date(2021,11,8)
    },
    {
      titulo:"Halo Reach",
      imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1064220/capsule_616x353.jpg?t=1634231207",
      notice: "Halo: Reach* llega a PC como la primera entrega de Halo: The Master Chief Collection. Ahora optimizado para PC, experimentar la historia heroica de Noble Team, un grupo de espartanos, que a través de gran sacrificio y coraje, salvó innumerables vidas frente a probabilidades imposibles. El planeta Reach es la última línea de defensa de la humanidad entre el Pacto invasor y su objetivo final, la destrucción de la Tierra. Si cae, la humanidad será empujada al borde de la destrucción.",
      date: new Date(2019,11,3)
    }
  ]


  generateCardNotice():string {
    let html = "";
    this.noticias.forEach( (noticia:Notice) => {

      let dateFormat = this.datePipe.transform(noticia.date, 'dd/MM/yyyy')

      html += `
        <div class="card text-center">
          <div class="card-header">
            ${noticia.titulo}
          </div>
          <div class="card-body">
            <img src="${noticia.imagen}" class="imgSizeCard" alt="">
            <p class="custom-justify">${noticia.notice}</p>
          </div>
          <div class="card-footer text-body-secondary">
            ${dateFormat}
          </div>
        </div>
      `
    })
    return html;
  }

  addNewNotice() {
    let message = "";
    Object.entries(this.newNotice).forEach(([key, value]) => {
      if(value === "") {
        message += "El campo " + this.inputsForm[key] + " es requerido.\n";
      }
    });


    if(message.trim() !== ''){
      alert(message);
    } else {
      this.noticias.push(this.newNotice)
      this.newNotice = {titulo:"", imagen: "", notice: "", date: ""}
    }

  }

}
