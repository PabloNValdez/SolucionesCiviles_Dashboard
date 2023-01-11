import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../Services/trabajos.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private trabajoService: TrabajosService, private toastrService: ToastrService) { }

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

  deleteWork(id) {
    this.trabajoService.deleteWork(id).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }

  enableWork(work) {
    const formData = new FormData();

    formData.append('id', work.userId);
    formData.append('name', work.userName);
    formData.append('description', work.firstName);
    formData.append('isDeleted', 'true');

    this.trabajoService.updateWork(formData).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }
}
