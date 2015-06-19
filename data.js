////////////////////////////
// DEPARTMENTS
///////////////////////////

var departments = [
  {
    title: "Accounting",
    icon: "<i class='fa fa-pencil'></i>",
    health: 8,
    energy: 8,
    attack: 4,
    defense: 4,
    abilities: [
      {
        title: "Number Crunch",
        cost: 45,
        power: 40,
        description: "Deals 40 damage to your enemy."
      },
      {
        title: "Bankruptcy",
        cost: 60,
        power: 1.4,
        description: "Deals 20 damage to your enemy and returns it as health."
      }
    ]
  },
  {
    title: "Management",
    icon: "<i class='fa fa-briefcase'></i>",
    health: 8,
    energy: 4,
    attack: 4,
    defense: 8,
    abilities: [
      {
        title: "Micromanage",
        cost: 45,
        power: 40,
        description: "Deals damage equal to 30% of your enemy's health."
      },
      {
        title: "Fire",
        cost: 60,
        power: 1.4,
        description: "Has a 50% chance to deal 60 damage."
      }
    ]
  },
  {
    title: "Marketing",
    icon: "<i class='fa fa-bar-chart'></i>",
    health: 4,
    energy: 4,
    attack: 8,
    defense: 8,
    abilities: [
      {
        title: "Advertise",
        cost: 45,
        power: 40,
        description: "Deals 25 damage as well as boosting your defense by 30%."
      },
      {
        title: "Broadcast",
        cost: 60,
        power: 1.4,
        description: "Heals self by 40."
      }
    ]
  },
  {
    title: "Sales",
    icon: "<i class='fa fa-usd'></i>",
    health: 4,
    energy: 8,
    attack: 8,
    defense: 4,
    abilities: [
      {
        title: "Cold-Call",
        cost: 45,
        power: 40,
        description: "Deals 30 damage and reduces your enemy's defense by 30%"
      },
      {
        title: "Close Sale",
        cost: 60,
        power: 1.4,
        description: "Starts at 30 damage, deals more if you have low health."
      }
    ]
  }

];

////////////////////////////
// ENEMIES
///////////////////////////

var enemyNames = ["Steven", "Michael", "Thomas", "Albert", "Franklin", "Alice", "Fran", "Bernice", "Tara", "Vince", "Matthew", "Pablo", "Sarah", "Patrick", "Pierre", "Quentin", "Brandon", "Grant", "Miranda"];



////////////////////////////
// CONSTRUCTORS
///////////////////////////


////////////////////////////
// FUNCTIONS
///////////////////////////

function getAttackNumArray() {
  var attackNum = [];
  for (var i = 1; i <= 100; i++) {
    attackNum.push(i);
  }
  return attackNum;
}
