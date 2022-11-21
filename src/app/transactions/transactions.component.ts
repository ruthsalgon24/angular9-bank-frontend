import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  userIdFrom: Number;
  userIdTo: Number;
  amount: Number ;
  isTransactionValid: boolean = true;
  error: any = null;
  txtamount: Number;
  txtfrom: Number;
  txtto: Number;

  constructor(private userService:UserService) { 

  }

  ngOnInit(): void {
    this.userService
    .errorSubject
    .subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }
 
  validateTransaction(type: Number) {
    if (this.userIdFrom) {
      this.isTransactionValid = true;
    } 
    else if (this.userIdTo) {
      this.isTransactionValid = true;
    } 
    else if (this.amount) {
      this.isTransactionValid = true;
    } 
    else {
      this.isTransactionValid = false;
    }
    this.validateTransaction(type);
  }

  onKey(event: any, type: Number) {
    if (type === 1) {
      this.userIdFrom = event.target.value;
    } else if (type === 1) {
      this.userIdTo = event.target.value;
    } else if (type === 1) {
      this.amount = event.target.value;
    
    this.validateTransaction(type);
  }
  }
  onKeytransaction(event: any, type: String) {
    if (type == "amount") {
      this.txtamount = event.target.value;
    } else if (type == "from") {
      this.txtfrom = event.target.value;
    } else if (type == "to") {
      this.txtto = event.target.value;
    
    
  }
  }
  onsubmit(){
    // console.log(this.userService.getUser().pipe(catchError(error => {
    //   return of('No data');
    // })));
    
    // this.userService.getUser().subscribe((data: { user: any }) => {
    // console.log(data.user.data)
    // });;
    // if (this.userService) {
    this.userService.transactions(this.txtfrom, this.txtto, this.txtamount); //need this one
    // }
    alert("Successful transaction");
  }
  
}
