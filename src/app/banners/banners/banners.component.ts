import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BannersService } from 'src/app/Services/banners.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  id: number;
  bannerForm: FormGroup;
  files: string[] = [];
  constructor(private toastr: ToastrService, private bannersService: BannersService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.bannerForm = new FormGroup({
      //name: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });  
  }

  validateControl = (controlName: string) => {
    return !this.bannerForm.get(controlName).valid && this.bannerForm.get(controlName).touched
  }
  hasError = (controlName: string, errorName: string) => {
    return this.bannerForm.get(controlName).hasError(errorName)
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.files.push(event.target.files[i]);
    }
  }

  guardar() {
    const formData = new FormData();
    for (var i = 0; i < this.files.length; i++) {
      formData.append("image[]", this.files[i]);
    }

    //formData.append('name', this.bannerForm.get('name').value);
    formData.append('descripcion', this.bannerForm.get('descripcion').value);
    
      this.bannersService.createBanner(formData).subscribe(response => {
        this.toastr.success(response.message);
        setTimeout(() => {
          this.router.navigate(['./list-banners']);
        }, 2000);
      }, error => {
        console.log(error);
      });
   
  }
}
