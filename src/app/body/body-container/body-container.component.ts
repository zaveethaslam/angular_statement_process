import {Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import {Http} from '@angular/http';
import {Headers, RequestOptions} from "@angular/http";
import successfulData from "../../../assets/successful_payload.json";
import duplicateData from "../../../assets/duplicateData_payload.json";
import unbalancedData from "../../../assets/unbalancedData_payload.json";
import bothErrorData from "../../../assets/bothErrorData_payload.json";
import badRequestData from "../../../assets/badRequestData_payload.json";
import invalidData from "../../../assets/invalidData_payload.json";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.css']
})
export class BodyContainerComponent implements OnInit {

  myForm: FormGroup;

  constructor(private http: Http) { }
  
  responseRecords : any;
  jsonText : any;

  ngOnInit() {
    this.myForm = new FormGroup({
      jsonContainer: new FormControl()
     });
  }

    onSubmit(): void{
    const jsonValue = this.myForm.value.jsonContainer;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' });
    let options = new RequestOptions({ headers: headers });
    console.log(jsonValue);
    this.http.post(environment.basepath, jsonValue, options).subscribe((res)=>{
      console.log(res);
      this.responseRecords = JSON.parse(res["_body"]);
      console.log(this.responseRecords);
    }, (err) => {
      console.log(err);
      this.responseRecords = JSON.parse(err["_body"]);
      console.log(this.responseRecords);
    });
   }

   generateData(data: any): void{
     if(data == "success")
       this.jsonText = JSON.stringify(successfulData);
      else if(data == "duplicate")
        this.jsonText = JSON.stringify(duplicateData);
      else if(data == "unbalanced")
        this.jsonText = JSON.stringify(unbalancedData); 
      else if(data == "both")
        this.jsonText = JSON.stringify(bothErrorData);
      else if(data == "badrequest")
        this.jsonText = JSON.stringify(badRequestData);
      else if(data == "error")
        this.jsonText = JSON.stringify(invalidData);
        

   }




 }
