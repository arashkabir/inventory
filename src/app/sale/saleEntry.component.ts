import { Component, OnInit, HostListener ,ViewChild, ElementRef,Renderer  } from '@angular/core';
import {SaleEntry} from '../model/saleEntry-model'
import {DataService} from '../service/data.service'
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
  manualQuantity:number;
  manualPrice:number;
  manualProductSelect:string;
  hideManulaEntry:boolean;
  token:string;

  @ViewChild('productName') productNameElement: ElementRef;

  constructor(private renderer: Renderer, private dataService: DataService) {
    this.salesList=[];
    this.hidePriceDialog=true;
    this.paymentType="Cash";
    this.totalPrice=0;
    this.customerBill=0;
    this.unitPrice=0;
    this.productDescription="";
    this.manualQuantity=0;
    this.manualPrice=0;
    this.manualProductSelect="";
    this.hideManulaEntry=true;
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
  this.token= this.dataService.getToken();
  }


  scanEntry(event){
    document.getElementById("productName").focus();
  }
  cancelDialog(event){
    this.hidePriceDialog=true;
    this.manualQuantity=0;
    this.manualPrice=0;
    this.manualProductSelect="";
  }

  closeManulalEntry(event){
    this.hideManulaEntry=true;
  }

  allowManulaEntry(event){
    this.hideManulaEntry=false;
  }
  addItemManualy(event){
    var product= new SaleEntry();
    product.productCode=this.productName;
    product.quantity=this.manualQuantity;
    product.unitPrice=this.manualPrice;
    product.totalPrice=this.manualPrice*this.manualQuantity;
   
    this.onAddToSaleList(product);
  
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
    this.manualQuantity=0;
    this.manualPrice=0;
    this.manualProductSelect="";
    document.getElementById("productName").focus();
  
  }
  onScan(){
this.dataService.getProductByBarcode(this.productName,this.token).subscribe(d =>(d=d));
   
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