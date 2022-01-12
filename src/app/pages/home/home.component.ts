import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CodeService } from 'src/app/core/services/code.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  focus: any;
  focus1: any;
  focus2: any;
  viewCodeMode = 0;
  viewCodeModeLink = '';

  searchForm: FormGroup = new FormGroup({
    all: new FormControl("", []),
    exact: new FormControl("", []),
    any: new FormControl("", []),
    none: new FormControl("", []),
    range1: new FormControl("", []),
    range2: new FormControl("", []),
  });
  link = '';
  searchFilters = [
    {
      name: "as_q",
      value: ""
    },
    {
      name: "as_epq",
      value: ""
    },
    {
      name: "as_oq",
      value: ""
    },
    {
      name: "as_eq",
      value: ""
    },
    {
      name: "as_nlo",
      value: ""
    },
    {
      name: "as_nhi",
      value: ""
    },
  ] as any;
  submitted = false;
  linksHistory = [] as any;
  constructor(private codeService: CodeService) {}

  ngOnInit() {
    this.codeService.getLinks().subscribe(res => {
      this.linksHistory = [...res];
      console.log(this.linksHistory);
      
    })
    
  }

  get f() {
    return this.searchForm.controls;
  }

  setValues(){
    this.searchFilters[0].value = this.searchForm.value['all'];
    this.searchFilters[1].value = this.searchForm.value['exact'];
    this.searchFilters[2].value = this.searchForm.value['any'];
    this.searchFilters[3].value = this.searchForm.value['none'];
    this.searchFilters[4].value = this.searchForm.value['range1'];
    this.searchFilters[5].value = this.searchForm.value['range2'];
    console.log(this.searchFilters);
    
  }

  getCode(link: any){
    this.viewCodeModeLink = link;
    this.viewCodeMode = 1;
  }

  getSearch(){
    this.viewCodeMode = 0;
    this.viewCodeModeLink = '';
    this.searchForm.reset();
    this.submitted = false;

  }

  submit(){
    if (this.searchFilters.invalid) {
      return ;
    }    
    this.submitted = true;
    this.setValues();
    let link = 'https://www.google.com/search?';
    let ok = 1;
    this.searchFilters.forEach((filter: any) =>{
      if(ok){
        ok = 0;
        link = link + filter.name + '=' + filter.value;
      }
      else{
        link = link + '&' + filter.name + '=' + filter.value;
      }
    });
    this.link = link;
    this.codeService.addLink(this.link);
    this.codeService.getLinks().subscribe(res => {
      this.linksHistory = [...res];
    })    
  }

}
