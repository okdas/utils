module.exports = function(db, done) {
  /*
  Группа пользователей.
  */

  var Group, Role, User;
  Group = db.define('Group', {
    name: {
      required: true,
      type: 'text',
      size: 50
    }
  });
  /*
  Пользователь.
  */

  User = db.define('User', {
    name: {
      required: true,
      type: 'text',
      size: 50
    },
    pass: {
      required: true,
      type: 'text',
      size: 64
    },
    group: {
      type: 'text',
      size: 50
    }
  });
  /*
  Роль.
  */

  Role = db.define('Role', {
    name: {
      required: true,
      type: 'text',
      size: 50
    }
  });
  Group.hasMany('users', User);
  Group.hasMany('roles', Role);
  return done();
};
