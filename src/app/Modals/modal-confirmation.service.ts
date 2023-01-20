import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmationComponent } from './modal-confirmation/modal-confirmation.component';
@Injectable({
  providedIn: 'root'
})
export class ModalConfirmationService {

  constructor(private modalService: NgbModal) { }

  public confirm(title: string, content: string, btnConfirm: string, btnCancel: string): Promise<boolean> {
    const modalRef = this.modalService.open(ModalConfirmationComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
    modalRef.componentInstance.btnConfirm = btnConfirm;
    modalRef.componentInstance.btnCancel = btnCancel;
    return modalRef.result;
  }
}
