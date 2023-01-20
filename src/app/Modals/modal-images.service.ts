import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImagesComponent } from './modal-images/modal-images.component';

@Injectable({
  providedIn: 'root'
})
export class ModalImagesService {

  constructor(private modalService: NgbModal) { }

  public confirm(content: string, btnConfirm: string, btnCancel: string): Promise<boolean> {
    const modalRef = this.modalService.open(ModalImagesComponent);
    modalRef.componentInstance.content = content;
    modalRef.componentInstance.btnConfirm = btnConfirm;
    modalRef.componentInstance.btnCancel = btnCancel;
    return modalRef.result;
  }
}
