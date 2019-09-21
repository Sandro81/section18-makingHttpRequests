import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './post.model';

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
    this.fetchPosts();
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postsService.createAndStoredPost(postData.title, postData.content);

  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }


  // Get Http request
  private fetchPosts() {
    this.http
      .get<{[key: string]: PostModel}>(
      'https://section18angularcourse.firebaseio.com/posts.json',
      )
      .pipe(map((responseData: {[key: string]: PostModel}) => {
        const postsArray: PostModel[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({...responseData[key], id: key });
          }
        }
        return postsArray;
      }))
      .subscribe(
        posts => {
          this.loadedPosts = posts;
          console.log(posts);
        });
  }

}
