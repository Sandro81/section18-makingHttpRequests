import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './post.model';
import {PostsService} from './posts.service';
import {Observable} from 'rxjs';
import {error} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    } );
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postsService.createAndStoredPost(postData.title, postData.content);

  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    },  error => {

    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService
      .deletePosts().subscribe(()=> {
        this.loadedPosts = [];
    });
  }


}
