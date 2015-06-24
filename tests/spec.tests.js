function setUpCharacter() {
  var charInfo = {};
  var charDepartment = departments[0];
  charInfo.name = "John";
  charInfo.department = charDepartment.title;
  charInfo.icon = charDepartment.icon;
  charInfo.maxHealth = (charDepartment.health * 25);
  charInfo.health = charInfo.maxHealth;
  charInfo.maxEnergy = (charDepartment.energy * 25);
  charInfo.energy = charInfo.maxEnergy;
  charInfo.attack = (charDepartment.attack * 10);
  charInfo.defense = (charDepartment.defense * 5);
  charInfo.ability1 = charDepartment.abilities[0];
  charInfo.ability2 = charDepartment.abilities[1];
  return charInfo;
}

function setUpEnemy() {
  var charInfo = {};
  var enemyDepartment = departments[1];
  charInfo.name = "Michael";
  charInfo.department = enemyDepartment.title;
  charInfo.icon = enemyDepartment.icon;
  charInfo.maxHealth = (enemyDepartment.health * 25);
  charInfo.health = charInfo.maxHealth;
  charInfo.maxEnergy = (enemyDepartment.energy * 25);
  charInfo.energy = charInfo.maxEnergy;
  charInfo.attack = (enemyDepartment.attack * 10);
  charInfo.defense = (enemyDepartment.defense * 5);
  charInfo.ability1 = enemyDepartment.abilities[0];
  charInfo.ability2 = enemyDepartment.abilities[1];
  return charInfo;
}

function attackAction() {
  var damageDealt = Math.round((player1.attack - (0.60 * player2.defense)));
  player2.health -= damageDealt;
  setUpStats();
  combatLogAttack(damageDealt);
  player2DeathCheck();
  if (player2DeathCheck() === false) {
    turnCounter += 1;
  }
}

var player1 = new Character(setUpCharacter());
var player2 = new Character(setUpEnemy());
console.log(player1);
console.log(player2);

describe('Character Constructor', function () {

  beforeEach(function () {

  });

  it('should be instance of Character', function () {
    expect(player1).to.be.an.instanceof(Character);
    expect(player2).to.be.an.instanceof(Character);
  });

  it('should have 2 abilities', function () {
    expect(player1).to.have.any.keys('ability1', 'ability2');
    expect(player2).to.have.any.keys('ability1', 'ability2');
  });

  it('should have properties', function () {
    expect(player1.name).to.be.equal("John");
    expect(player1.attack).to.be.equal(40);
    expect(player1.defense).to.be.equal(20);
    expect(player1.health).to.be.equal(200);
    expect(player1.energy).to.be.equal(200);
    expect(player2.name).to.be.equal("Michael");
    expect(player2.attack).to.be.equal(40);
    expect(player2.defense).to.be.equal(40);
    expect(player2.health).to.be.equal(200);
    expect(player2.energy).to.be.equal(100);
  });

  describe('Attacking method', function () {
    beforeEach(function () {

    });
    it('attacking player2 should reduce health by player1\'s attack minus 40% of player2\'s defense', function () {
      var damageDealt = Math.round((player1.attack - (0.60 * player2.defense)));
      expect(player2.health).is.equal(200);
      attackAction();
      expect(player2.health).is.equal(200 - damageDealt);

    });

  });

  describe('Abilities method', function () {
    beforeEach(function () {
      player2.health = player2.maxHealth;
    });
    it('check that abilities exist and contain functions', function () {
      expect(player1.ability1.player1Action).is.a('function');
      expect(player1.ability2.player1Action).is.a('function');
      expect(player2.ability1.player2Action).is.a('function');
      expect(player2.ability2.player2Action).is.a('function');
    });

    it('check that abilities work as intended', function() {
      expect(player2.health).is.equal(200);
      player1.ability1.player1Action();
      expect(player1.energy).is.equal(200 - player1.ability1.cost);
      expect(player2.health).is.equal(200 - 25);
      expect(player2.attack).is.equal(40 - (40 * 0.1));
    });
  });
});
