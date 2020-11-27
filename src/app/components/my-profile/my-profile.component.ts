import {Component, OnInit} from '@angular/core';
import {DeveloperDataModel, DeveloperService, SellerMyProfile} from 'oc-ng-common-service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

export interface Page {
  pageId: string;
  pageTitle: string;
  placeholder: string;
  showByTypes: string [];
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {


  pages: Page[] = [{
    pageId: 'company',
    pageTitle: 'My Company',
    placeholder: 'Company details',
    showByTypes: ['admin', 'general'],
  }, {
    pageId: 'profile',
    pageTitle: 'My Profile',
    placeholder: 'General',
    showByTypes: ['*'],
  }, {
    pageId: 'password',
    pageTitle: 'My Profile',
    placeholder: 'Password',
    showByTypes: ['*'],
  }];

  currentPages: Page[] = [];
  selectedPage: Page;

  myProfile = new SellerMyProfile();
  isProcessing = false;

  developerData: DeveloperDataModel = {};

  private subscriptions = new Subscription();

  constructor(
      private activatedRoute: ActivatedRoute,
      private developerService: DeveloperService) {
  }

  ngOnInit(): void {
    this.initProfile();
  }

  gotoPage(newPage: Page) {
    this.selectedPage = newPage;
  }

  goBack() {
    history.back();
  }

  private initProfile() {
    this.subscriptions.add(this.developerService.getDeveloper().subscribe(developer => {
      this.developerData.developer = developer;
      this.currentPages = this.filterPagesByDeveloperType(developer.type);
      this.initMainPage();
    }));
  }

  private initMainPage() {
    const pageType = this.activatedRoute.snapshot.paramMap.get('pageId');
    if (pageType) {
      const pageByUrl = this.currentPages.filter(page => page.pageId === pageType)[0];
      if (pageByUrl) {
        this.selectedPage = pageByUrl;
      }
    } else {
      this.selectedPage = this.currentPages[0];
    }
  }

  private filterPagesByDeveloperType(developerType: string): Page [] {
    return this.currentPages = this.pages.filter(page =>
        page.showByTypes.filter(pattern => pattern === '*' || pattern === developerType || !developerType).length > 0);
  }
}
