export class Mot {

  id!: number;
  nom!: string;
  couleur?: string;
  position?: number;

  constructor(id: number, nom: string, couleur: string, position: number) {
    this.id = id;
    this.nom = nom;
    this.couleur = couleur;
    this.position = position;
  }

}
