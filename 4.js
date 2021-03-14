const database = {
  getUser: (id, callback) => {
    const users = [
      {
        id: 1,
        name: "Robert"
      },
      {
        id: 2,
        name: "John"
      }
    ];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2]
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [
      {
        id: 1,
        name: "Art of war"
      },
      {
        id: 2,
        name: "Hunger games"
      },
      {
        id: 3,
        name: "1984"
      }
    ];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  }
};

const fetchData = (fn, arg) =>
  new Promise((resolve, reject) => {
    database[fn](arg, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

const buyBookForUser = async (bookId, userId, callback) => {
  try {
    await fetchData("getUser", userId);

    const userBooks = await fetchData("getUsersBook", userId);

    if (userBooks.includes(bookId)) {
      callback(`User already has book with id=${bookId}`);
    } else {
      await fetchData("buyBook", bookId);
      callback(null, "Success");
    }
  } catch (err) {
    callback(err);
  }
};

// все працює тільки показує в неправильному порядку повідомлення
buyBookForUser(1, 1, (err, message) => {
  console.log("1 err", err); // null
  console.log("1 m", message); // 'Success'
});

buyBookForUser(1, 2, (err, message) => {
  console.log("2 err", err); // 'User already has book with id=1'
  console.log("2 m", message); // undefined
});

buyBookForUser(3, 2, (err, message) => {
  console.log("3 err", err); // null
  console.log("3 m", message); // 'Success'
});

buyBookForUser(5, 2, (err, message) => {
  console.log("4 err", err); // 'Book with id=5 not found'
  console.log("4 m", message); // undefined
});

buyBookForUser(1, 3, (err, message) => {
  console.log("5 err", err); // 'User with id=3 not found'
  console.log("5 m", message); // undefined
});
