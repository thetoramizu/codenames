export class Etape {

  numeroEtape!: number;
  nom!: string[];
  couleur!: string;
  mot!: string;
  nombre?: number;

  constructor(numeroEtape: number, nom: string[], couleur: string, mot: string, nombre: number) {
    this.numeroEtape = numeroEtape;
    this.nom = nom;
    this.couleur = couleur;
    this.mot = mot;
    this.nombre = nombre;
  }

}
