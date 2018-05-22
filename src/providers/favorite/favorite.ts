import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from "../../shared/dish";
import { DishProvider } from "../dish/dish";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';

/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: HttpClient, private dishservice: DishProvider,
              private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    this.favorites = [];

    this.storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites = favorites;
      } else {
        console.log("no favorites stored");
        this.favorites = [];
      }
    });
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
    }
    this.addToStorage();
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    //1. 对 dishes 过滤 2. 如何过滤？favorites 包含该 dish id
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    //index >= 0 means there exists id to delete
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.addToStorage();
      return this.getFavorites();
    } else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

  addToStorage() {
    this.storage.set('favorites', this.favorites);
  }
}
