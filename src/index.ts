// src/index.ts
export function helloWorld(): string {
  return "Hello, world!";
};

export class Fighter {
  name: string;
  health: number;
  damagePerAttack: number;

  constructor(name: string, health: number, damagePerAttack: number) {
    this.name = name;
    this.health = health;
    this.damagePerAttack = damagePerAttack;
  }

  isDead(): boolean {
    if (this.health <= 0){
      return true
    } else {
      return false
    }
  }

  attack(victum: Fighter){
    victum.health = victum.health - this.damagePerAttack
  }

  toString(): string {
    return this.name;
  }
}

export function getWinner(fighter1: Fighter, fighter2: Fighter): Fighter | null{
  const isFighter1Dead = fighter1.isDead()
  const isFighter2Dead = fighter2.isDead()
  if (isFighter1Dead && !isFighter2Dead){
    return fighter2
  }
  if (!isFighter1Dead && isFighter2Dead){
    return fighter1
  }
  return null
}