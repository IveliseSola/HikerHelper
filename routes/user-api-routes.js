var db = require("../models");

module.exports = function(app) {

  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [
        {model: db.SearchParam, include: [
          {model: db.Activity}
        ]}
      ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {model: db.SearchParam, include: [
          {model: db.Activity}
        ]}
      ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create({
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.delete("/api/users", function(req, res) {
    db.User.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};