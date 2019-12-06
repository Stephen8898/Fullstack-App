import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { element } from 'protractor';

@Component({
  selector: 'app-news-info-modal',
  templateUrl: './news-info-modal.component.html',
  styleUrls: ['./news-info-modal.component.sass']
})
export class NewsInfoModalComponent implements OnInit {

  items: Object [] = [];

  titles: String = "";
  authors: String = "";
  descriptions: String = "";
  sources: String = "";
  siteLinks: String = "";
  images: String = "";
  counter: number = 0;
  size: number = 0;

  constructor(private api: ApiService) { }


  ngOnInit() {
    this.mapData();
  }

  mapData(){
      let data = this.api.getNewsData();
      data.then(res => {
        res.result.map(articles => {
          this.items.push(articles);
        })
       this.size = this.items.length;
       this.modal();
    })
  }

  modal(){
    let item: any = this.items[this.counter];
    this.titles = item.title;
    this.siteLinks = item.siteLink;
    this.images = item.image;
    this.descriptions = item.description; 
  }
  

  next(){
    if(this.counter >= this.size-1){
      this.counter = 0;
    }else{
    this.counter++;
    }
    console.log(this.counter);
    this.modal()
  }
  prev(){
    if (this.counter <= 0){
        this.counter = this.size-1;
    } else {
        this.counter--;
      }
      console.log(this.counter)
      this.modal()
  }


}
