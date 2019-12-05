import { Component, OnInit } from '@angular/core';

import { ApiService} from "../../services/api.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  value: String = ""
  items: Object [] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  onEnter(search: String): void{
    this.value = search;
    console.log(this.value);
    let data = this.api.searchNewsData(this.value);
    data.then(res =>{
      res.result.map(articles => {
        this.items.push(articles);
      });
      console.log(this.items);
    });

  }


}
