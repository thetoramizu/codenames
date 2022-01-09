export class Joueur {

  // id!: number;
  nom!: string;
  couleur?: string;
  role?: string;

  constructor(nom: string, couleur: string, role: string) {
    this.nom = nom;
    this.couleur = couleur;
    this.role = role;
  }

}
