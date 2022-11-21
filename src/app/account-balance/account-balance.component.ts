import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
  @Input() user: any;
  date = null;
  day = null;
  month = null;
  year = null;
  showAmt: boolean = true;
  btnVal = "Show";
  

  toggleMe()
  {
    this.showAmt=!this.showAmt;
    if (this.showAmt === true){
      this.btnVal = "Show"
      // this.pera = "*****"
    } else {
      this.btnVal = "Hide"
      // this.pera = this.user.balance;
    }



 }
  constructor() { }

  ngOnInit(): void {
    this.date = new Date();
    this.day = this.date.getDate();
    this.month = Number(this.date.getMonth()) + 1;
    this.year = this.date.getFullYear();
  }
}
