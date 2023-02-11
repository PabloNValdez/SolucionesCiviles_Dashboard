import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CatalogosService } from '../Services/catalogos.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {

  catalogoForm: FormGroup;
  id: number;
  constructor(private toastr: ToastrService, private catalogosService: CatalogosService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.catalogoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required])
    }); 
  }

  validateControl = (controlName: string) => {
    return !this.catalogoForm.get(controlName).valid && this.catalogoForm.get(controlName).touched
  }
  hasError = (controlName: string, errorName: string) => {
    return this.catalogoForm.get(controlName).hasError(errorName)
  }

  guardar() {
    const formData = new FormData();

    formData.append('name', this.catalogoForm.get('name').value);
    formData.append('link', this.catalogoForm.get('link').value);
    
      this.catalogosService.createCatalogo(formData).subscribe(response => {
        this.toastr.success(response.message);
        setTimeout(() => {
          this.router.navigate(['./list-catalogos']);
        }, 2000);
      }, error => {
        console.log(error);
      });
   
  }
}
