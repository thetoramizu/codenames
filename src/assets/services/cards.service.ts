import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Mot} from "../models/mot.model";

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  urlBdd = 'http://localhost:3001/mot?_sort=nom&_order=rand';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getRandomCards(){
    return this.httpClient.get<Mot[]>(this.urlBdd);
  }

  public getCard(id: number) {
    const url = 'http://localhost:3001/mot?id=' + id;

    return this.httpClient.get<Mot[]>(url);
  }

  addMot(mot: Mot) {
    const url = 'http://localhost:3001/mot'
    return this.httpClient.post(url, mot)
  }
}
