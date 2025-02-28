import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  isActive:boolean;
  isConfirm:boolean;
  isLoading:boolean;
  loadingMessage:string;
  confirmResolve:()=>void;
  constructor(private spinnerService:LoadingSpinnerService) {
    spinnerService.setSpinner(this);
  }
  ngOnInit() {

  }
  confirm(){
    if(this.confirmResolve){
      this.confirmResolve();
    }
  }
  cancel(){
    this.confirmResolve = null;
    this.isConfirm = false;
    this.spinnerService.hideLoader();

  }
}
