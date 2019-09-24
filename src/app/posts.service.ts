import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {PostModel} from './post.model';
import {map, catchError} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }


  createAndStoredPost(title: string, content: string) {
    const postData: PostModel = {title: title, content: content};
    this.http
      .post<{ name: string }>(
        'https://section18angularcourse.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: PostModel }>(
        'https://section18angularcourse.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: searchParams
        }
      )
      .pipe(map((responseData: { [key: string]: PostModel }) => {
          const postsArray: PostModel[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({...responseData[key], id: key});
            }
          }
          return postsArray;
        }),
        catchError(erroeRes => {
          // Send to analytics server
          return throwError(erroeRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete('https://section18angularcourse.firebaseio.com/posts.json',
      {
        observe: 'events'
      }
    );
  }

}
