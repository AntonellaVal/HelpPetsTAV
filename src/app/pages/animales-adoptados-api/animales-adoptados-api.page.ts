import { Component, OnInit } from '@angular/core';
import { ApiservicioService } from 'src/app/services/apiservicio.service';

@Component({
  selector: 'app-animales-adoptados-api',
  templateUrl: './animales-adoptados-api.page.html',
  styleUrls: ['./animales-adoptados-api.page.scss'],
  standalone: false,
})
export class AnimalesAdoptadosApiPage implements OnInit {

  posts: any;
  constructor(private api: ApiservicioService) { }

  ngOnInit() {
     //llamo a la funcion get del servicio
    this.api.obtenerPosts().subscribe(res=>{
      //guardo la info del servicio en una api rest
      console.log(res.data);
      this.posts = res.data;
    })
  }

}
