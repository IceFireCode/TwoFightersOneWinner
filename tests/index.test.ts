// tests/index.test.ts
import { declareWinner, Fighter, getWinner } from "../src/";

describe('Two fighters, one winner', () => {

  describe('We can run the game to determine a winner', () => {
    describe('Simple fights where one attack kills the other fighter, with fighter 1 attacking first', () => {
      describe('When fighter has a damagePerAttack of 2 and fighter two has 1 health', () => {
        const fighter1 = new Fighter("Lew", 5, 2)
        const fighter2 = new Fighter("Harry", 1, 5)
        it('Fighter 1 will win the game, as fighter 2 will be dead after one attack', () => {
          expect(declareWinner(fighter1, fighter2, 'Lew')).toBe("Lew");
        });
      });
      describe('When fighter 2 survives the first attack, has a damagePerAttack of 2 and fighter two has 1 health', () => {
        const fighter1 = new Fighter("Lew", 1, 2)
        const fighter2 = new Fighter("Harry", 10, 2)
        it('Fighter 2 will win the game, as fighter 1 will be dead after one attack', () => {
          expect(declareWinner(fighter1, fighter2, 'Harry')).toBe("Harry");
        });
      });
    });


    describe('Complex fights over multiple rounds of attacks', () => {
      describe('When both fighters have 15 health and 4 damage per attack', () => {
        it('When Lew is allowed to attack first, he wins the game', () => {
          const fighter1 = new Fighter("Lew", 15, 4)
          const fighter2 = new Fighter("Harry", 15, 4)
          expect(declareWinner(fighter1, fighter2, 'Lew')).toBe("Lew");
        });
        it('When Harry is allowed to attack first, he wins the game', () => {
          const fighter1 = new Fighter("Lew", 15, 4)
          const fighter2 = new Fighter("Harry", 15, 4)
          expect(declareWinner(fighter1, fighter2, 'Harry')).toBe("Harry");
        });
      });
      describe('When both fighters have 16 health and 2 damage per attack', () => {
        it('When Lew is allowed to attack first, he wins the game', () => {
          const fighter1 = new Fighter("Lew", 16, 2)
          const fighter2 = new Fighter("Harry", 16, 2)
          expect(declareWinner(fighter1, fighter2, 'Lew')).toBe("Lew");
        });
        it('When Harry is allowed to attack first, he wins the game', () => {
          const fighter1 = new Fighter("Lew", 16, 2)
          const fighter2 = new Fighter("Harry", 16, 2)
          expect(declareWinner(fighter1, fighter2, 'Harry')).toBe("Harry");
        });
      });
    });
  });

  // assert.strictEqual(declareWinner(new Fighter("Lew", 10, 2), new Fighter("Harry", 5, 4), "Lew"), "Lew");

  // assert.strictEqual(declareWinner(new Fighter("Lew", 10, 2), new Fighter("Harry", 5, 4), "Harry"), "Harry");

  //     assert.strictEqual(declareWinner(new Fighter("Harald", 20, 5), new Fighter("Harry", 5, 4), "Harry"), "Harald")

  //     assert.strictEqual(declareWinner(new Fighter("Harald", 20, 5), new Fighter("Harry", 5, 4), "Harald"), "Harald")

  //     assert.strictEqual(declareWinner(new Fighter("Jerry", 30, 3), new Fighter("Harald", 20, 5), "Jerry"), "Harald")

  //     assert.strictEqual(declareWinner(new Fighter("Jerry", 30, 3), new Fighter("Harald", 20, 5), "Harald"), "Harald")

  describe('We can create fighters', () => {
    it('Fighter Lew can be created', () => {
      const lew = new Fighter("Lew", 10, 5)
      expect(lew.name).toBe('Lew');
      expect(lew.health).toBe(10);
      expect(lew.damagePerAttack).toBe(5);
      expect(lew.toString()).toBe("Lew");
    });
    it('Fighter Harry can be created', () => {
      const harry = new Fighter("Harry", 8, 3)
      expect(harry.name).toBe('Harry');
      expect(harry.health).toBe(8);
      expect(harry.damagePerAttack).toBe(3);
      expect(harry.toString()).toBe("Harry");
    });
  })

  describe('We can determine if a fighter is dead or not', () => {
    it('A fighter with health 0 is considered dead', () => {
      const fighter = new Fighter("Lew", 0, 5)
      expect(fighter.isDead()).toBe(true)
    })
    it('A fighter with health -1 is considered dead', () => {
      const fighter = new Fighter("Lew", -1, 5)
      expect(fighter.isDead()).toBe(true)
    })
    it('A fighter with health 1 is considered to still be alive', () => {
      const fighter = new Fighter("Lew", 1, 5)
      expect(fighter.isDead()).toBe(false)
    })
  })

  describe('We can determine the winner of the fight, if one of them is dead', () => {
    it('When both fighters are still alive (have health > 0), we have no winner', () => {
      const fighter1 = new Fighter("Lew", 5, 5)
      const fighter2 = new Fighter("Harry", 10, 5)
      expect(getWinner(fighter1, fighter2)).toBe(null)
      expect(getWinner(fighter2, fighter1)).toBe(null)
    })
    it('When both fighters are dead (health <= 0), we have no winner', () => {
      const fighter1 = new Fighter("Lew", -5, 5)
      const fighter2 = new Fighter("Harry", -10, 5)
      expect(getWinner(fighter1, fighter2)).toBe(null)
      expect(getWinner(fighter2, fighter1)).toBe(null)
    })
    it('When the second of two fighters is dead, the first fighter is the winner', () => {
      const fighter1 = new Fighter("Lew", 5, 5)
      const fighter2 = new Fighter("Harry", -10, 5)
      expect(getWinner(fighter1, fighter2)).toBe(fighter1)
      expect(getWinner(fighter2, fighter1)).toBe(fighter1)
    })
    it('When the first of two fighters is dead, the second fighter is the winner', () => {
      const fighter1 = new Fighter("Lew", -5, 5)
      const fighter2 = new Fighter("Harry", 10, 5)
      expect(getWinner(fighter1, fighter2)).toBe(fighter2)
      expect(getWinner(fighter2, fighter1)).toBe(fighter2)
    })
  })

  describe('A fighter can attack another fighter, damaging their health', () => {
    it('A fighter with a damagePerAttack of 1, will damage the health of another fighter with 1', () => {
      const fighter1 = new Fighter("Lew", 5, 1)
      const fighter2 = new Fighter("Harry", 10, 5)
      fighter1.attack(fighter2)
      expect(fighter2.health).toBe(9);
    });
    it('A fighter with a damagePerAttack of 5, will damage the health of another fighter with 5', () => {
      const fighter1 = new Fighter("Lew", 5, 5)
      const fighter2 = new Fighter("Harry", 10, 5)
      fighter1.attack(fighter2)
      expect(fighter2.health).toBe(5);
    });
  });

});