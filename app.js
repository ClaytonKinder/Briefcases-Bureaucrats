var charName;
var charDepartment;
var player1;
var player2;
var turnCounter = 1;
$('#gamePage').hide();
$('#winLoseBlock').hide();

$('#actionAbility1Block').hover(function(e) {
  e.preventDefault();
  $('#infoBoxBlockTitle').text(player1.ability1.title);
  $('#infoBoxBlockCost span').text(player1.ability1.cost);
  $('#infoBoxBlockDescription').text(player1.ability1.description);
  $('#infoBoxBlock').show();
}, function(e) {
  $('#infoBoxBlock').hide();
});

$('#actionAbility2Block').hover(function(e) {
  e.preventDefault();
  $('#infoBoxBlockTitle').text(player1.ability2.title);
  $('#infoBoxBlockCost span').text(player1.ability2.cost);
  $('#infoBoxBlockDescription').text(player1.ability2.description);
  $('#infoBoxBlock').show();
}, function(e) {
  $('#infoBoxBlock').hide();
});

$('.creationDepartmentBlock').on('click', function(e) {
  $(this).siblings().removeClass('activeDepartment');
  $(this).addClass('activeDepartment');
  var charDepartmentTitle = $(this).find('.creationDepartmentName').text().trim();
  _.each(departments, function(el, idx, arr) {
    if (departments[idx].title === charDepartmentTitle) {
      charDepartment = el;
    }
  });
});

$('#creationSubmitButton').on('click', function(e) {
  charName = $('#characterNameInput').val().trim();
  if (charName !== undefined && charName.length > 0 && charDepartment !== undefined) {
    var charInfo = setUpCharacter();
    var enemyInfo = setUpEnemy();
    player1 = new Character(charInfo);
    player2 = new Character(enemyInfo);
    $('#characterNameInput').val("");
    $('.creationDepartmentBlock').removeClass('activeDepartment');
    $('#characterCreationPage').fadeOut();
    $('#gamePage').fadeIn();
    setUpStats();
    whoseTurn();
  } else {

  }
});

$('#actionAttackBlock').on('click', function(e) {
  e.preventDefault();
  console.log('TURNCOUNT: ', turnCounter);
  attackAction();
  setTimeout(enemyAction, 2000);
  console.log('TURNCOUNT: ', turnCounter);
  whoseTurn();
});

$('#actionAbility1Block').on('click', function(e) {
  e.preventDefault();
  if (player1.energy >= player1.ability1.cost) {
    console.log('TURNCOUNT: ', turnCounter);
    ability1Action();
    setTimeout(enemyAction, 2000);
    console.log('TURNCOUNT: ', turnCounter);
    whoseTurn();
  } else {
    $('#combatLogText').text("Not enough energy!");
    $('#combatLogText').fadeIn().delay(1000).fadeOut();
  }
});

$('#actionAbility2Block').on('click', function(e) {
  e.preventDefault();
  if (player1.energy >= player1.ability1.cost) {
    console.log('TURNCOUNT: ', turnCounter);
    ability2Action();
    setTimeout(enemyAction, 2000);
    console.log('TURNCOUNT: ', turnCounter);
    whoseTurn();
  } else {
    $('#combatLogText').text("Not enough energy!");
    $('#combatLogText').fadeIn().delay(1000).fadeOut();
  }
});

$('#winLosePlayAgain').on('click', function(e) {
  e.preventDefault();
  $('#winLoseBlock').hide();
  $('#gamePage').hide();
  $('#characterCreationPage').fadeIn();
})

function enemyAction() {
  var enemyActionNumber = Math.floor(Math.random() * 4) + 1;
  if (enemyActionNumber === 1 || enemyActionNumber === 2) {
    attackAction();
    whoseTurn();
  } else if (enemyActionNumber === 3) {
    ability1Action();
    whoseTurn();
  } else {
    ability2Action();
    whoseTurn();
  }
}

function combatLogAttack(damageDealt) {
  if (turnCounter % 2 !== 0) {
    console.log('Player 1 is attacking.');
    $('#combatLogText').text(player1.name + " attacked " + player2.name + " for " + damageDealt + " damage!");
    $('#combatLogText').fadeIn().delay(1000).fadeOut();
  } else {
    console.log('Player 2 is attacking.');
    $('#combatLogText').text(player2.name + " attacked " + player1.name + " for " + damageDealt + " damage!");
    $('#combatLogText').fadeIn().delay(1000).fadeOut();
  }
}

function attackAction() {
  if (turnCounter % 2 !== 0) {
    var damageDealt = Math.round((player1.attack - (0.60 * player2.defense)));
    player2.health -= damageDealt;
    setUpStats();
    combatLogAttack(damageDealt);
    player2DeathCheck();
    if (player2DeathCheck() === false) {
      turnCounter += 1;
    }
  } else {
    var damageDealt = Math.round((player2.attack - (0.60 * player1.defense)));
    player1.health -= damageDealt;
    setUpStats();
    combatLogAttack(damageDealt);
    player1DeathCheck();
    if (player1DeathCheck() === false) {
      turnCounter += 1;
    }
  }
}

function ability1Action() {
  console.log(player1.energy);
  console.log(player1.ability1.cost);
  if (turnCounter % 2 !== 0) {
    if (player1.energy >= player1.ability1.cost) {
      player1.ability1.player1Action();
      setUpStats();
      player2DeathCheck();
      if (player2DeathCheck() === false) {
        turnCounter += 1;
      }
    }
  } else {
    if (player2.energy >= player2.ability1.cost) {
      player2.ability1.player2Action();
      setUpStats();
      player1DeathCheck();
      if (player1DeathCheck() === false) {
        turnCounter += 1;
      }
    } else {
      enemyAction();
    }
  }
}

function ability2Action() {
  console.log('ENERGY BEFORE: ', player1.energy);
  console.log('COST BEFORE: ', player1.ability2.cost);
  if (turnCounter % 2 !== 0) {
    if (player1.energy >= player1.ability2.cost) {
      player1.ability2.player1Action();
      console.log('ENERGY AFTER: ', player1.energy);
      console.log('COST AFTER: ', player1.ability2.cost);
      setUpStats();
      player2DeathCheck();
      if (player2DeathCheck() === false) {
        turnCounter += 1;
      }
    }
  } else {
    if (player2.energy >= player2.ability2.cost) {
      player2.ability2.player2Action();
      setUpStats();
      player1DeathCheck();
      if (player1DeathCheck() === false) {
        turnCounter += 1;
      }
    } else {
      enemyAction();
    }
  }
}

function player1DeathCheck() {
  if (player1.health <= 0) {
    $('#winLoseText').text("Your loser!");
    $('#winLoseBlock').fadeIn();
    resetGame();
    return true;
  } else {
    return false;
  }
}

function player2DeathCheck() {
  if (player2.health <= 0) {
    $('#winLoseText').text("Your Winnar!");
    $('#winLoseBlock').fadeIn();
    resetGame();
    return true;
  } else {
    return false;
  }
}

function whoseTurn() {
  var turnAnnouncement;
  if (turnCounter % 2 !== 0) {
    turnAnnouncement = player1.name + "'s turn.";
    $('#turnBlock').text(turnAnnouncement);
    if (player1.energy < player1.maxEnergy) {
      if ((player1.energy += 10) >= player1.maxEnergy) {
        player1.energy = player1.maxEnergy;
        setUpStats();
      } else {
        player1.energy += 10;
        setUpStats();
      }
    }
  } else {
    turnAnnouncement = player2.name + "'s turn.";
    $('#turnBlock').text(turnAnnouncement);
    if (player2.energy < player2.maxEnergy) {
      if ((player2.energy += 10) >= player2.maxEnergy) {
        player2.energy = player2.maxEnergy;
        setUpStats();
      } else {
        player2.energy += 10;
        setUpStats();
      }
    }
  }
}

function resetGame() {
  charName;
  charDepartment;
  player1;
  player2;
  turnCounter = 1;
}

function Character(charInfo) {
  this.name = charInfo.name;
  this.department = charInfo.department;
  this.icon = charInfo.icon;
  this.maxHealth = charInfo.maxHealth;
  this.health = charInfo.health;
  this.maxEnergy = charInfo.maxEnergy;
  this.energy = charInfo.energy;
  this.attack = charInfo.attack;
  this.defense = charInfo.defense;
  this.ability1 = charInfo.ability1;
  this.ability2 = charInfo.ability2;
}

function setUpCharacter() {
  var charInfo = {};
  charInfo.name = $('#characterNameInput').val().trim();
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
  var enemyDepartment = departments[Math.floor(Math.random() * departments.length)];
  charInfo.name = enemyNames[Math.floor(Math.random() * enemyNames.length)];
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

function setUpStats() {
  $('#playerInfoTitle h3').text(player1.name + " from " + player1.department);
  $('#playerHealth').text(Math.round(player1.health));
  if (player1.energy <= 0) {
    player1.energy = 0;
    $('#playerEnergy').text(0)
  } else {
    $('#playerEnergy').text(Math.round(player1.energy));
  }
  $('#playerAttack').text(Math.round(player1.attack));
  $('#playerDefense').text(Math.round(player1.defense));
  $('#playerIcon').html(player1.icon);
  $('#actionAbility1Block').text(player1.ability1.title);
  $('#actionAbility2Block').text(player1.ability2.title);

  $('#enemyInfoTitle h3').text(player2.name + " from " + player2.department);
  $('#enemyHealth').text(Math.round(player2.health));
  if (player2.energy <= 0) {
    player2.energy = 0;
    $('#enemyEnergy').text(0)
  } else {
    $('#enemyEnergy').text(Math.round(player2.energy));
  }
  $('#enemyAttack').text(Math.round(player2.attack));
  $('#enemyDefense').text(Math.round(player2.defense));
  $('#enemyIcon').html(player2.icon);
}
