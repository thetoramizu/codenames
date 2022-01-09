import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Joueur} from "../../../assets/models/joueur.model";
import {JoueurService} from "../../../assets/services/joueur.service";
import {Etape} from "../../../assets/models/etape.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tour-de-jeu',
  templateUrl: './tour-de-jeu.component.html',
  styleUrls: ['./tour-de-jeu.component.scss']
})
export class TourDeJeuComponent implements OnInit {

  listPlayers: Joueur[] = [];

  // joueur actif = couleur: bleu / rouge
  @Input() joueurActif: string | undefined;

  // liste des joueurs à qui c'est le tour'
  doitJouer: Joueur[] = [];

  // etape: si impair = chef; pair = neutre
  etape: number = 0;

  listPlayedSteps: Etape[] =
    // [new Etape(55, this.doitJouer.map(player => player.nom), 'bleu', 'ToDo Mot / Mots', 3)];
    [];

  displayedColumns: string[] = ['numeroEtape', 'nom', 'mot', 'nombre'];
  dataSource = new MatTableDataSource<Etape>();



  constructor(
    private joueurService: JoueurService,
  ) { }

  ngOnInit(): void {
    // Récupération de tous les joueurs
    this.joueurService.getAllPlayers().subscribe(joueurs => {
      this.listPlayers = joueurs;

      this.dataSource.data = this.listPlayedSteps;
      this.getPlayerTurn();
    });

  }

  getPlayerTurn(){

    this.etape++;


    // Si pair: tour des neutres
    if (this.etape%2 === 0) {
      this.doitJouer = this.listPlayers.filter(j => (j.couleur === this.joueurActif && j.role === 'neutre'))
      if (this.joueurActif === 'bleu') {
        this.joueurActif = 'rouge';
      } else {
        this.joueurActif = 'bleu';
      }
    }
    else {
      // Sinon tour des chefs
      this.doitJouer = this.listPlayers.filter(j => (j.couleur === this.joueurActif && j.role === 'chef'))
    }

  }

  validateTurn(){

    this.listPlayedSteps.push(
      new Etape(this.etape, this.doitJouer.map(player => player.nom),  this.doitJouer[0]?.couleur?this.doitJouer[0]?.couleur : '' , 'ToDo Mot / Mots', 3)
    )
    // @ts-ignore
    this.dataSource.data = this.listPlayedSteps;


    this.getPlayerTurn();
  }

}
