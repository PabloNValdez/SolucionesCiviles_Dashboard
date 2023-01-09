import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../Services/trabajos.service';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;
@Component({
  selector: 'app-list-trabajos',
  templateUrl: './list-trabajos.component.html',
  styleUrls: ['./list-trabajos.component.css']
})
export class ListTrabajosComponent implements OnInit {

  currentIndex: any = -1;
  showFlag: any = false;
  listOfworks: Array<any> = [];
  work:Array<any> = [];
  imgaes:Array<object> = [];
  title: string;
  description: string;
  actualImages:Array<any> = [];
  datos: Array<any>=[];

  constructor(private trabajoService: TrabajosService) { }

  ngOnInit(): void {
    this.trabajoService.getAllWorks().subscribe(respose =>{
      this.datos = respose;
      respose.forEach(element => {
        //element.imagesDto[0].path = `${apiUrl}/${element.imagesDto[0].path}`; 
        
        var trabajo:Array<any> = [];

        trabajo[0] = element.name;
        trabajo[1] = element.description;

        this.work[0] = element.name;
        this.work[1] = element.description;

        var images:Array<object> = [];

        element.imagesDto.forEach(e =>{
          var img = decodeURIComponent(`${apiUrl}/${e.path}`);
          // console.log(img);
          images.push({image:img});
        })
        // console.log(images);
        this.work[2] = images;
        trabajo[2]= images;
        trabajo[3] = element.id;
        this.listOfworks.push(trabajo);
        console.log(this.listOfworks);
        
      });
      // this.work = [];
    });
  }

  showLightbox(index) {
    this.actualImages= this.listOfworks[index][2];
    this.currentIndex = 0;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}