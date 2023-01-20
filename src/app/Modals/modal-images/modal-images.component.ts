import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.css']
})
export class ModalImagesComponent implements OnInit {

  @Input() content;
  @Input() btnConfirm;
  @Input() btnCancel;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public cancel() {
    this.activeModal.close(false);
  }

  public confirm() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
}
