let users = [
  { id: "1", name: "Aalia", bio: "A+ College Student" },
  {
    id: "2",
    name: "Bob Marley",
    bio:
      "Bob Marley was born on February 6, 1945, in Nine Miles, Saint Ann, Jamaica, to Norval Marley and Cedella Booker.",
  },
  {
    id: "3",
    name: "IP Man",
    bio:
      "Yip Man, also known as Ip Man, was born on October 1, 1893, in Foshan, China. He studied Wing Chun and went on to become one of the most respected martial arts masters of his time. Among his most notable students was Bruce Lee. Yip Man died on December 2, 1972, in Hong Kong.",
  },
];

function getUsers() {
  return users;
}

function getUserById(id) {
  return users.find((u) => u.id === id);
}

function createUser(data) {
  const payload = {
    id: String(users.length + 1),
    ...data,
  };

  users.push(payload);
  return payload;
}

function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  users[index] = {
    ...users[index],
    ...data,
  };

  return users[index];
}

function deleteUser(id) {
  users = users.filter((u) => u.id != id);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
