import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CatalogosService } from '../Services/catalogos.service';

@Component({
  selector: 'app-list-catalogos',
  templateUrl: './list-catalogos.component.html',
  styleUrls: ['./list-catalogos.component.css']
})
export class ListCatalogosComponent implements OnInit {

 
  datos: Array<any>=[];
  catalogos: Array<any>=[];  
  allCatalogos: Array<any>=[]; 
  p: number = 1;
  saniti: DomSanitizer;//Sanitiza los link, para hacerlos seguros
  catalogo:Array<any> = [];
  constructor(private catalogosService: CatalogosService, private sanitizer: DomSanitizer, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.saniti= this.sanitizer;
    this.catalogosService.getAllCatalogos().subscribe(response=>{
      this.datos = response.slice().reverse();
      this.datos.forEach(element =>{
          var catalogo:Array<any> = [];

          catalogo[0] = element.name;
          catalogo[1] = element.link;
          catalogo[3] = element.id;
          catalogo[4] = element.isDeleted;

          this.allCatalogos.push(catalogo);
          this.catalogos.push(element);
      });
    });
  }

  enableWork(catalogo) {
    const formData = new FormData();
    console.log(catalogo);

    formData.append('id', catalogo[3]);
    formData.append('name', catalogo[0]);
    formData.append('link', catalogo[1]);
    formData.append('isDeleted', 'false');

    this.catalogosService.updateCatalogo(formData).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }

  deleteWork(id) {
    this.catalogosService.deleteCatalogo(id).subscribe(response => {
      this.toastrService.success(response.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, error => {
      this.toastrService.error(error);
    })
  }
}
