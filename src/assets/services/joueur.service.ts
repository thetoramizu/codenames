import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Joueur} from "../models/joueur.model";

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  url = 'http://localhost:3001/joueur'

  constructor(
    private http: HttpClient
  ) { }

  getAllPlayers(){
    return this.http.get<Joueur[]>(this.url)
  }


}
