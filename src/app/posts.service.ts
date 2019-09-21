import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
  createAndStoredPost(title: string, content: string){
    this.http
      .post<{name: string}>(
        'https://section18angularcourse.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}
