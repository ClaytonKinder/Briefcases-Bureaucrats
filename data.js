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
        cost: 50,
        description: "Deals 25 damage to your enemy, and reduces their attack by 10%.",
        player1Action: function() {
          $('#combatLogText').text(player1.name + " used " + player1.ability1.title + " and dealt 25 damage to " + player2.name + ", reducing their attack by 10%.");
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player1.energy -= player1.ability1.cost;
          player2.health -= 25;
          player2.attack -= (player2.attack * 0.1);
        },
        player2Action: function() {
          $('#combatLogText').text(player2.name + " used " + player2.ability1.title + " and dealt 25 damage to " + player1.name + ", reducing their attack by 10%.");
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player2.energy -= player2.ability1.cost;
          player1.health -= 25;
          player1.attack -= (player1.attack * 0.1);
        }
      },
      {
        title: "Bankruptcy",
        cost: 60,
        description: "Deals 20 damage to your enemy and returns it as health.",
        player1Action: function() {
          $('#combatLogText').text(player1.name + " used " + player1.ability2.title + " and drained 20 health from " + player2.name);
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player1.energy -= player1.ability2.cost;
          player2.health -= 20;
          player1.health += 20;
        },
        player2Action: function() {
          $('#combatLogText').text(player2.name + " used " + player2.ability2.title + " and drained 20 health from " + player1.name);
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player2.energy -= player2.ability2.cost;
          player1.health -= 20;
          player2.health += 20;
        }
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
        cost: 50,
        description: "Deals damage equal to 30% of your enemy's health.",
        player1Action: function() {
          $('#combatLogText').text(player1.name + " used " + player1.ability1.title + " and dealt " + (0.30 * player2.health) + " damage to " + player2.name);
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player1.energy -= player1.ability1.cost;
          player2.health -= (0.30 * player2.health);
        },
        player2Action: function() {
          $('#combatLogText').text(player2.name + " used " + player2.ability1.title + " and dealt " + (0.30 * player1.health) + " damage to " + player1.name);
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player2.energy -= player2.ability1.cost;
          player1.health -= (0.30 * player1.health);
        }
      },
      {
        title: "Fire",
        cost: 50,
        description: "Has a 50% chance to deal 60 damage.",
        player1Action: function() {
          var fireChance = Math.floor(Math.random() * 2) + 1;
          if (fireChance === 2) {
            $('#combatLogText').text(player1.name + " used " + player1.ability2.title + " and dealt 60 damage to " + player2.name);
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player1.energy -= player1.ability2.cost;
            player2.health -= 60;
          } else {
            $('#combatLogText').text(player1.name + " used " + player1.ability2.title + " but it missed!");
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player1.energy -= player1.ability2.cost;
          }
        },
        player2Action: function() {
          var fireChance = Math.floor(Math.random() * 2) + 1;
          if (fireChance === 2) {
            $('#combatLogText').text(player2.name + " used " + player2.ability2.title + " and dealt 60 damage to " + player1.name);
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player2.energy -= player2.ability2.cost;
            player1.health -= 60;
          } else {
            $('#combatLogText').text(player2.name + " used " + player2.ability2.title + " but it missed!");
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player2.energy -= player2.ability2.cost;
          }
        }
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
        description: "Deals 25 damage and increases your defense by 10%.",
        player1Action: function() {
          $('#combatLogText').text(player1.name + " used " + player1.ability1.title + " and dealt 25 damage to " + player2.name);
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player1.energy -= player1.ability1.cost;
          player2.health -= 25;
          player1.defense = (player1.defense * 1.1);
        },
        player2Action: function() {
          $('#combatLogText').text(player2.name + " used " + player2.ability1.title + " and dealt 25 damage to " + player1.name);
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player2.energy -= player2.ability1.cost;
          player1.health -= 25;
          player2.defense = (player1.defense * 1.1);
        }
      },
      {
        title: "Broadcast",
        cost: 60,
        description: "Heals self by 40.",
        player1Action: function() {
          $('#combatLogText').text(player1.name + " used " + player1.ability2.title + ", regaining 40 health.");
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player1.energy -= player1.ability2.cost;
          player1.health += 40;
        },
        player2Action: function() {
          $('#combatLogText').text(player2.name + " used " + player2.ability2.title + ", regaining 40 health.");
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player2.energy -= player2.ability2.cost;
          player2.health += 40;
        }
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
        cost: 50,
        description: "Deals 30 damage and reduces your enemy's defense by 10%",
        player1Action: function() {
          $('#combatLogText').text(player1.name + " used " + player1.ability1.title + " and dealt 30 damage to " + player2.name + ", reducing his defense by 10%.");
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player1.energy -= player1.ability1.cost;
          player2.health -= 30;
          player2.defense -= (player2.defense * 0.1);
        },
        player2Action: function() {
          $('#combatLogText').text(player2.name + " used " + player2.ability1.title + " and dealt 30 damage to " + player1.name + ", reducing his defense by 10%.");
          $('#combatLogText').fadeIn().delay(1000).fadeOut();
          player2.energy -= player2.ability1.cost;
          player1.health -= 30;
          player1.defense -= (player1.defense * 0.1);
        }
      },
      {
        title: "Close Sale",
        cost: 60,
        description: "Instantly kills an enemy with 25% health or less, otherwise deals 30 damage.",
        player1Action: function() {
          if (player2.health <= (0.25 * player2.maxHealth)) {
            $('#combatLogText').text(player1.name + " used " + player1.ability2.title + " instantly killing " + player2.name);
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player1.energy -= player1.ability1.cost;
            player2.health -= (0.25 * player2.maxHealth);
          } else {
            $('#combatLogText').text(player1.name + " used " + player1.ability2.title + " and dealt 30 damage to " + player2.name);
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player1.energy -= player1.ability2.cost;
            player2.health -= 30;
          }
        },
        player2Action: function() {
          if (player1.health <= (0.25 * player1.maxHealth)) {
            $('#combatLogText').text(player2.name + " used " + player2.ability2.title + " instantly killing " + player1.name);
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player2.energy -= player2.ability2.cost;
            player1.health -= (0.25 * player1.maxHealth);
          } else {
            $('#combatLogText').text(player2.name + " used " + player2.ability2.title + " and dealt 30 damage to " + player1.name);
            $('#combatLogText').fadeIn().delay(1000).fadeOut();
            player2.energy -= player2.ability2.cost;
            player1.health -= 30;
          }
        }
      }
    ]
  }

];

////////////////////////////
// ENEMIES
///////////////////////////

var enemyNames = ["Steven", "Michael", "Thomas", "Albert", "Franklin", "Alice", "Fran", "Bernice", "Tara", "Vince", "Matthew", "Pablo", "Sarah", "Patrick", "Pierre", "Quentin", "Brandon", "Grant", "Miranda"];
