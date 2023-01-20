import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { TrabajosService } from '../Services/trabajos.service';
import { ActivatedRoute } from '@angular/router';
import { ModalImagesService } from '../Modals/modal-images.service';
import { ModalConfirmationService } from '../Modals/modal-confirmation.service';
import { ImageDto } from '../Models/trabajo.model';
import Swal from 'sweetalert2';

const apiUrl = environment.apiUrl;
@Component({
  selector: 'app-edit-trabajo',
  templateUrl: './edit-trabajo.component.html',
  styleUrls: ['./edit-trabajo.component.css']
})
export class EditTrabajoComponent implements OnInit {

  @ViewChild('image') fileInput;
  trabajoForm: FormGroup;
  trabajo;
  imagesUrl: string[] = [];
  files: string[] = [];
  errorMessage: string = '';
  showError: boolean = false;
  deleteImage: number;
  savedImages: any [] = [];
 
  id: string;
  deletedImages: any [] = [];

  constructor(private trabajoService: TrabajosService, private toastr: ToastrService, private route: ActivatedRoute,
    private modalImagesService: ModalImagesService, private modalConfirmationService: ModalConfirmationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getData(this.id);
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

  getData(id) {
    this.trabajoService.getWorkByID(id).subscribe(response => {
      this.trabajo = response;
      console.log(this.trabajo);
      this.trabajoForm.get('name').setValue(response.name);
      this.trabajoForm.get('description').setValue(response.description);
      response.imagesDto.forEach(element => {
        let path = `${apiUrl}/${element.path}`;
        this.imagesUrl.push(path);
        // console.log(element.path);

        let image: any [] = [];
        image[0]= element.id;
        image[1]=path;
        this.savedImages.push(image);
        
      }); 
      console.log(this.savedImages)
      // this.savedImages = this.imagesUrl.slice();
      this.deleteImage = this.imagesUrl.length;
    }, error => {
      console.log(error)
    });
  }


  onFileChange(event) {
    if(event.target.files.length > 0){
      for (var i = 0; i < event.target.files.length; i++) {
        this.files.push(event.target.files[i]);
      }
    }  
  }

  guardar() {
    this.updateWork();
  }

  imageModal(picture) {
    console.log(picture[0]);
    const outerHtmlPicture = picture[1];
    const outerHtml = `<h5 class="bold">¿Seguro desea eliminar la imagen?</span></h5>`
    this.modalImagesService.confirm(outerHtmlPicture, 'Eliminar Imagen', 'Volver')
    .then((confirmed) => {
      if (confirmed) {
        this.modalConfirmationService.confirm('', outerHtml, 'Si', 'No')
          .then((confirmed) => {
            if (confirmed) {
              let image: any [] = [];
              image[0]= parseInt(picture[0]);
             // image[1] = picture[1].replace(apiUrl+"/", '');

              this.deletedImages.push(image);
              console.log(this.deletedImages);  

              let eliminar = this.savedImages.findIndex(p => p == picture)
              this.savedImages.splice(eliminar,1);
              //this.updateWork();
            } else {
            }
          })
      } else {
      }
    })
    .catch(() => {
    });
  }

  updateWork(){ 
    const formData = new FormData();
    formData.append('id', this.id);
    formData.append('name', this.trabajoForm.get('name').value);
    formData.append('description', this.trabajoForm.get('description').value);
    /* Imágenes */
    for (var i = 0; i < this.files.length; i++) {
      formData.append("image[]", this.files[i]);
    }
    /* Deleted images */
    if(this.deletedImages.length > 0){
      for (var i = 0; i < this.deletedImages.length; i++) {
        formData.append("deletedImages[]", this.deletedImages[i]);
      }
      this.deletedImages = null;
    }
    
    this.trabajoService.updateWorkWIthDeletedImages(formData).subscribe(response => {
      Swal.fire({
        title: "<h3 class='black' style='color:#215785'> "+response.message+"  </h3>",
        // imageUrl: '../../assets/img/logo_solo.png',
        confirmButtonText: 'Volver',
        showDenyButton: false,
        buttonsStyling: false,
        customClass: {
          actions: 'vertical-buttons',
          confirmButton: 'btn btn-back-home',
          denyButton: 'btn btn-another-booking',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(); 
        }
      });
    }, error => {
      this.errorMessage = error;
      this.showError = true;
      console.log(error);
    }); 
  }
}
