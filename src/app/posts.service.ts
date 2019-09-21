import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PostModel} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {}


  createAndStoredPost(title: string, content: string){
    const postData: PostModel = {title: title, content: content};
    this.http
      .post<{name: string}>(
        'https://section18angularcourse.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  fetchPosts() {

  }
}
