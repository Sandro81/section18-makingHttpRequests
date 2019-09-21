import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PostModel} from './post.model';
import {map} from 'rxjs/operators';

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
    return this.http
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
        posts => {});
  }
}
