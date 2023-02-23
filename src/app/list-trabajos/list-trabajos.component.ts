import { Component, OnInit } from '@angular/core';
import { TrabajosService } from '../Services/trabajos.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

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
  isDeleted: boolean;

  constructor(private trabajoService: TrabajosService, private toastrService: ToastrService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.trabajoService.getAllWorks().subscribe(respose =>{
      this.datos = respose;
      respose.forEach(element => {
        var trabajo:Array<any> = [];

        trabajo[0] = element.name;
        trabajo[1] = element.description;

        this.work[0] = element.name;
        this.work[1] = element.description;

        trabajo[4] = element.isDeleted;
        this.work[4] = element.isDeleted;

        var images:Array<object> = [];

        element.imagesDto.forEach(e =>{
          var img = decodeURIComponent(`${apiUrl}/${e.path}`);
          images.push({image:img});
        })
        this.work[2] = images;

        if(images.length == 0){
          var im:Array<object> = [];
          im.push({image: '../../assets/img/imageNotFound.png'});
          trabajo[2] = im;
        }else{
          trabajo[2]= images;
        }

        trabajo[3] = element.id;
        trabajo[4] = element.isDeleted

        this.listOfworks.push(trabajo);
    
      });

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
        this.router.navigate(['']);
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }

  enableWork(work) {
    const formData = new FormData();
    console.log(work);

    formData.append('id', work[3]);
    formData.append('name', work[0]);
    formData.append('description', work[1]);
    formData.append('isDeleted', 'false');

    this.trabajoService.updateWork(formData).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }
}
