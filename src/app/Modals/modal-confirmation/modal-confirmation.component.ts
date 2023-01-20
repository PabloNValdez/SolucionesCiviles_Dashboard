import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() title;
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
