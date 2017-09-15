import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../../shared/services/data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [DataService]
})
export class ListComponent implements OnInit {
  public list: any;
  public listKeys: any;
  public currentPage: number = 1;

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((params: Params) => {
      this.currentPage = +params["page"];
      
      this._dataService.getList(this.currentPage).subscribe(res => {
        this.list = JSON.parse(JSON.stringify(res)).main;
        this.listKeys = Object.keys(this.list);
        console.log(this.list);
      });     
    });
  }

  goToPage(page) {
    if (page > 0) {
      this.router.navigate(['/list', page]);
    }
  }

}
