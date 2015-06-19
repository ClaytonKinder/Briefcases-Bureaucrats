var charName;
var charDepartment;
var player1;
var player2;
var player1Turn = true;
$('#gamePage').hide();

$('.creationDepartmentBlock').on('click', function(e) {
  $(this).siblings().removeClass('activeDepartment');
  $(this).addClass('activeDepartment');
  var charDepartmentTitle = $(this).find('.creationDepartmentName').text().trim();
  console.log(charDepartmentTitle);
  _.each(departments, function(el, idx, arr) {
    if (departments[idx].title === charDepartmentTitle) {
      charDepartment = el;
    }
  });

  console.log(charDepartment);
});

$('#creationSubmitButton').on('click', function(e) {
  charName = $('#characterNameInput').val().trim();
  if (charName !== undefined && charName.length > 0 && charDepartment !== undefined) {
    var charInfo = setUpCharacter();
    var enemyInfo = setUpEnemy();
    player1 = new Character(charInfo);
    player2 = new Character(enemyInfo);
    console.log(player2);
    $('#characterNameInput').val("");
    $('.creationDepartmentBlock').removeClass('activeDepartment');
    $('#characterCreationPage').fadeOut();
    $('#gamePage').fadeIn();
    setUpStats();
  } else {

  }
});

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
  $('#playerHealth').text(player1.health);
  $('#playerEnergy').text(player1.energy);
  $('#playerAttack').text(player1.attack);
  $('#playerDefense').text(player1.defense);
  $('#playerIcon').html(player1.icon);
  $('#actionAbility1Block').text(player1.ability1.title);
  $('#actionAbility2Block').text(player1.ability2.title);

  $('#enemyInfoTitle h3').text(player2.name + " from " + player2.department);
  $('#enemyHealth').text(player2.health);
  $('#enemyEnergy').text(player2.energy);
  $('#enemyAttack').text(player2.attack);
  $('#enemyDefense').text(player2.defense);
  $('#enemyIcon').html(player2.icon);
}
