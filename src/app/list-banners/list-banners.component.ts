import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { BannersService } from '../Services/banners.service';

const apiUrl = environment.apiUrl;
@Component({
  selector: 'app-list-banners',
  templateUrl: './list-banners.component.html',
  styleUrls: ['./list-banners.component.css']
})
export class ListBannersComponent implements OnInit {

  currentIndex: any = -1;
  showFlag: any = false;
  publiImages: Array<any> = [];
  imgaes:Array<object> = [];
  title: string;
  description: string;
  actualImages:Array<any> = [];
  datos: Array<any>=[];
  isDeleted: boolean;
  p: number = 1;

  constructor(private bannerService: BannersService, private toastrService: ToastrService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bannerService.getAllPubliImages().subscribe(respose =>{
      this.datos = respose;
      respose.forEach(element => {
        var publi:Array<any> = [];

        publi[0] = element.fileName;
        publi[1] = element.descripcion;

        publi[4] = element.isDeleted;

        var image:Array<object> = [];

   
        var img = decodeURIComponent(`${apiUrl}/${element.path}`);
        image.push({image:img});
       

        if(image.length == 0){
          var im:Array<object> = [];
          im.push({image: '../../assets/img/imageNotFound.png'});
          publi[2] = im;
        }else{
          publi[2]= image;
        }

        publi[3] = element.id;
        publi[4] = element.isDeleted

        this.publiImages.push(publi);
    
      });

    });
  }

  deleteBanner(id) {
    this.bannerService.deleteBanner(id).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }

  enableBanner(banner) {
    const formData = new FormData();
    //console.log(work);

    formData.append('id', banner[3]);
    formData.append('fileName', banner[0]);
    formData.append('descripcion', banner[1]);
    formData.append('isDeleted', 'false');

    this.bannerService.updateBanner(formData).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }

}
