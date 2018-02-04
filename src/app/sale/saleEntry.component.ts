import { Component, OnInit, HostListener ,ViewChild, ElementRef,Renderer  } from '@angular/core';
import {SaleEntry} from '../model/saleEntry-model'

declare var document: any;
@Component({
  selector: 'app-sale-entry',
  templateUrl: './saleEntry.component.html'
})

export class SaleEntryComponent implements OnInit {
  salesList: SaleEntry[];
  totalPrice:number;
  customerBill:number;
  productName:string;
  paymentType:string;
  paymentTypes:any[];
  hidePriceDialog:boolean;
  productDescription:string;
  unitPrice:number;

  @ViewChild('productName') productNameElement: ElementRef;

  constructor(private renderer: Renderer) {
    this.salesList=[];
    this.hidePriceDialog=true;
    this.paymentType="Cash";
    this.totalPrice=0;
    this.customerBill=0;
    this.unitPrice=0;
    this.productDescription="";
    this.paymentTypes = [
      { value: 'Cash', display: 'Cash' },
      { value: 'Credit', display: 'Credit' }
  ];

  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    
    if(event.srcElement.localName==="body"){
          document.getElementById("productName").focus();
    }
    
 
  }

  ngOnInit() {
   
  }


  cancelDialog(event){
    this.hidePriceDialog=true;
  }

  addItem(event){
    var product= new SaleEntry();
    product.productCode=this.productName;
    product.quantity=1;
    product.unitPrice=this.unitPrice;
    product.totalPrice=product.unitPrice;
    
    this.hidePriceDialog=true;
    
    this.onAddToSaleList(product);
  }
  pay(event){

    this.salesList=[];
    this.paymentType="Cash";
    this.totalPrice=0;
    this.customerBill=0;
    this.unitPrice=0;
    this.productDescription="";
    document.getElementById("productName").focus();
  
  }
  onScan(){
    var product= new SaleEntry();
    product.productCode=this.productName;
    product.quantity=1;
    product.unitPrice=1.25;
    product.totalPrice=product.unitPrice;
    
    this.onAddToSaleList(product);
    
  }

onAddToSaleList(product: SaleEntry){
  var found = this.salesList.find(function(element) {
    return element.productCode === product.productCode;
  });

  if(found){
      found.quantity+=1;
      found.totalPrice=product.unitPrice * found.quantity;
      this.getTotal(this.salesList);
  } else {
      this.salesList.push(product);
      this.getTotal(this.salesList);
  }
    this.productName="";
}

  paymentClick(event){
    this.getTotal(this.salesList);
  }

  removeItem(item:SaleEntry){
    var index = this.salesList.findIndex(function(element) {
      return element.productCode === item.productCode;
    });

    if(index>-1){
      this.salesList.splice(index,1);
      this.getTotal(this.salesList);
    }
  }
  getTotal(sales: SaleEntry[]){
    if( this.paymentType=="Cash"){
      this.totalPrice=0;
    }else {
      this.totalPrice=0.5;
  }


    for (let entry of sales) {
      this.totalPrice+=entry.totalPrice;
  }
  }

}