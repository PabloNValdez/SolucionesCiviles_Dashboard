import { Component, OnInit } from '@angular/core';
import { Trabajo } from '../Models/trabajo.model';
import { TrabajosService } from '../Services/trabajos.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trabajos',
  templateUrl: './trabajos.component.html',
  styleUrls: ['./trabajos.component.css']
})
export class TrabajosComponent implements OnInit {

  files: string[] = [];
  trabajoForm: FormGroup;
  trabajos: Trabajo[] = [];
  isEditMode: boolean;
  id: number;
  trabajoRequest: Trabajo = {
    id: 0,
    name: '',
    description: '',
    images: [],
    deletedImages: [],
    isDeleted: false
  };

  // constructor(private trabajoService: TrabajosService, private toastr: ToastrService, private router: Router,private route: ActivatedRoute) { }
  constructor(private trabajoService: TrabajosService, private toastr: ToastrService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = this.id > 0;

    this.trabajoForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('')
    });  
  }

  validateControl = (controlName: string) => {
    return !this.trabajoForm.get(controlName).valid && this.trabajoForm.get(controlName).touched
  }
  hasError = (controlName: string, errorName: string) => {
    return this.trabajoForm.get(controlName).hasError(errorName)
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

    formData.append('name', this.trabajoForm.get('name').value);
    formData.append('description', this.trabajoForm.get('description').value);

    if (this.isEditMode) {
    } else {
      this.trabajoService.createWork(formData).subscribe(response => {
        this.toastr.success(response.message);
        setTimeout(() => {
          //window.location.reload(); 
          this.router.navigate(['./list-trabajos']);
        }, 2000);
      }, error => {
        console.log(error);
      });
    }
  }

}
