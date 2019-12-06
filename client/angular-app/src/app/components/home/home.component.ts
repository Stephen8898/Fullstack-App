import { Component, OnInit } from '@angular/core';

import { ApiService} from "../../services/api.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  value: String = "";
  items: Object [] = [];


  constructor(private api: ApiService) { }

  ngOnInit() {
  }
  onEnter(search: String): void {
    this.value = search;
    let data = this.api.searchNewsData(this.value);
    data.then(res => {
      res.result.map(articles => {
        this.items.push(articles);
      });
      console.log(this.items.length);
    });
    this.deleteList(this.items);
  }

  deleteList(list): void {
      let size: number = list.length;
      if (size > 0){
        while(size > 0){
          this.items.pop();
          size--;
        }
      }
      console.log(size);
  }


}
