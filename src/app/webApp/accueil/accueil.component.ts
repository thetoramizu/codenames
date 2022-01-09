import {Component, OnInit} from '@angular/core';
import {CardsService} from "../../../assets/services/cards.service";
import {Mot} from "../../../assets/models/mot.model";
import {HttpClient} from "@angular/common/http";
import {JoueurService} from "../../../assets/services/joueur.service";
import {Joueur} from "../../../assets/models/joueur.model";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  listCardsInPlay: Mot[] = [];
  firstPlayer: string = '';
  nbMotsBleus = 6;
  nbMotsRouges = 6;
  listPositionBleus: number[] = [];
  listPositionRouges: number[] = [];
  listPositionNeutres: number[] = [];
  positionNoir: number = 0;
  allListLength: number = 0;

  listNewMotsToAdd: Mot[] = [];
  gameSetup: boolean = false;
  joueurActif: string = '';


  constructor(
    private cardsService: CardsService,
    private joueurService: JoueurService,
    private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    // Récupère le nombre total de mots possibles
    this.httpClient.get<Mot[]>('http://localhost:3001/mot').subscribe(data => {
      this.allListLength = data.length;
    })

  }

  /**
   * Met les 25 cartes en place.
   *
   */
  getRandomCards() {
    this.clearListMots();

    let i = 0;
    while (i < 25) {
      this.getCard(i);
      i++
    }
  }

  getCard(i: number) {

    const max = this.allListLength;
    const min = 0;

    const number = Math.floor(Math.random() * (max - min + 1) + min)

    this.cardsService.getCard(number).subscribe(response => {
      if (this.listCardsInPlay.filter(mot => mot.id === response[0].id).length == 0) {
        response[0].position = i;
        this.listCardsInPlay.push(response[0])
      } else {
        this.getCard(i)
      }
    })
  }


  // async remplirMots() {
  //   const mots = ['anniversaire', 'travail', 'souris', 'bouche', 'marteau',
  //     'renard', 'sous-marin', 'tablier', 'ancre', 'invisible', 'palais', 'tomate',
  //     'bastion', 'samouraï', 'billet', 'dentition', 'université', 'chaleur', 'jouet', 'maillot',
  //     'combinaison', 'poulailler', 'camembert', 'ours', 'bibelot', 'chocolat', 'miel', 'canne', 'mimosa']
  //
  //   let lastIndex = 4;
  //
  //   await (
  //     mots.forEach(mot => {
  //       lastIndex++;
  //       // Todo = existe déjà ??
  //       let nouveauMot = new Mot(lastIndex, mot, "", 9999);
  //       this.cardsService.addMot(nouveauMot).subscribe(res => console.log('voilà'))
  //     }))
  // }

  /**
   * Vide la grille de mots
   */
  clearListMots() {
    this.listCardsInPlay = [];
    this.gameSetup = false;
  }


  /**
   * Met en place le jeu selon la radio-button sélectionné
   */
  selectFirstPlayer() {

    switch (this.firstPlayer) {
      case 'blue': {
        this.nbMotsBleus = 7;
        this.nbMotsRouges = 6;
        break;
      }
      case 'red': {
        this.nbMotsRouges = 7;
        this.nbMotsBleus = 6;
        break;
      }
      default : {
        const number = Math.floor(Math.random() * (2 - 1 + 1) + 1);
        if (number === 1) {
          this.nbMotsBleus = 7;
          this.nbMotsRouges = 6;
        } else {
          this.nbMotsRouges = 7;
          this.nbMotsBleus = 6;
        }
      }
    }

    this.setBlue();
    this.setRed();
    this.setBlack();


    this.gameSetup = true;

    if(this.nbMotsRouges > this.nbMotsBleus) {
      this.joueurActif = 'rouge';
    } else {
      this.joueurActif = 'bleu';
    }

  }


  setBlue() {

    let i = 0;
    while (i < this.nbMotsBleus) {

      const number = Math.floor(Math.random() * (24 - 0 + 1) + 0)
      let mot = this.listCardsInPlay.find(mot => mot.position === number)
      if (mot !== undefined && mot.position !== undefined && mot.couleur === "") {
        mot.couleur = 'bleu';
        i++;
      } else {
        console.log('ERREUR')
        // this.setBlue();
        // i--;
      }
    }

  }

  setRed() {

    let i = 0;
    while (i < this.nbMotsRouges) {

      const number = Math.floor(Math.random() * (24 - 0 + 1) + 0)
      let mot = this.listCardsInPlay.find(mot => mot.position === number)
      if (mot !== undefined && mot.position !== undefined && mot.couleur === "") {
        mot.couleur = 'rouge';
        i++;
      } else {
        // this.setRed();
      }
    }

  }

  setBlack() {

    const number = Math.floor(Math.random() * (24 - 0 + 1) + 0)
    let mot = this.listCardsInPlay.find(mot => mot.position === number)
    if (mot !== undefined && mot.position !== undefined && mot.couleur === "") {
      mot.couleur = 'noir';
    } else {
      this.setBlack();
    }
  }

  setNeutral() {

  }



  test400Mots(){

    let index = 0;
    let test400MotsFile = '';

    let reader = new FileReader();

    this.httpClient.get('assets/json/400.txt', {responseType: 'text'})
      .subscribe(data => {
        console.log(data)
        const lines = data.split(/\r?\n/);
        console.log(lines.length)
        // lines.forEach(line => {
        //
        // })


        // let listNewMots: Mot[] = [];

        for(let line of lines) {
          let newMot = new Mot(index, line, "", 9999);

          this.listNewMotsToAdd.push(newMot);
          index ++;

        }





          // this.httpClient.post(`http://localhost:3001/mot`, newMot).subscribe(
          //   data => {
          //     console.log('POST Request is successful ', data);
          //     index++;
          //   },
          //   error => {
          //     console.log('Error', error);
          //   });


        // }


      });

    // reader.readAsText('src/assets/json/400.txt')

    // const text = this.ab2str(reader.result);
    // const lines = text.split(/\r?\n/);
    //
    // lines.forEach((line: string) => {
    //   const vars = line.split(' ');
    //   console.log(vars);
    // });

  }



  addNewMots() {
    this.httpClient.post(`http://localhost:3001/mot`, this.listNewMotsToAdd).subscribe(
      res => {
        console.log('+++++++++++++++++++++++++++++++++')
      }, error => {
        console.log('---------------------------------')
      });
  }



}
