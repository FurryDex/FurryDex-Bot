// Charger la base de données des utilisateurs depuis le fichier JSON
let users = {};
try {
  users = JSON.parse(fs.readFileSync('./users.json'));
} catch (err) {
  console.error(err.message);
}

// Fonction pour sauvegarder la base de données des utilisateurs dans le fichier JSON
function saveUsers() {
  fs.writeFile('./users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.error(err.message);
    }
  });
}

// Fonction pour ajouter un utilisateur à la base de données
function addUser(user) {
  if (!users[user.id]) {
    users[user.id] = {
      username: user.username,
      warnCount: 0,
      warnBy: {}
    };
    saveUsers();
    console.log(`Utilisateur ${user.username} ajouté à la base de données.`);
  }
}

// Fonction pour obtenir le nombre de warn d'un utilisateur
function getWarnCount(user) {
  return users[user.id] ? users[user.id].warnCount : 0;
}

// Fonction pour ajouter un avertissement à un utilisateur
function addWarn(user, warnBy) {
  if (users[user.id]) {
    users[user.id].warnCount++;
    if (!users[user.id].warnBy[warnBy.id]) {
      users[user.id].warnBy[warnBy.id] = 1;
    } else {
      users[user.id].warnBy[warnBy.id]++;
    }
    saveUsers();
    console.log(`Utilisateur ${user.username} averti par ${warnBy.username}.`);
  }
}

module.exports = { addUser, addWarn, getWarnCount, saveUsers}