var express = require('express');
var router = express.Router();
var gitanaJson = require('../gitana.json');
var cloudcms = require('cloudcms');

var cachedSession = null;

var repositoryId = 'b7a9374d20f91c325655';

var tenantId = '5042e2fd62829f754806';
var baseCdnUrl = 'https://cdn.cloudcms.com/trial/' + tenantId;

function enhanceBook(book) {
  var self = this;

  book.imageUrl = baseCdnUrl + "/store/books/" + book.slug + ".jpg";
  book.pdfUrl = baseCdnUrl + "/store/books/" + book.slug + ".pdf";

  if (book.recommendations)
  {
    book.recommendations.forEach((recommendation) => {
      recommendation._doc = recommendation.id;
      recommendation.imageUrl = baseCdnUrl + "/store/books/" + recommendation.slug + ".jpg";
      recommendation.pdfUrl = baseCdnUrl + "/store/books/" + recommendation.slug + ".pdf";
    });
  }
};

function enhanceAuthor(author) {
  author.imageUrl = baseCdnUrl + "/store/authors/" + author.slug + ".jpg";

};

// Cloudcms authentication middleware
router.use(async function (req, res, next) {
  if (!cachedSession)
  {
    var session = await cloudcms.connect(gitanaJson);
    req.cloudcms = session;
    cachedSession = session;
  }
  else
  {
    req.cloudcms = cachedSession;
  }
  
  next();
});


// Branch multiplexing middleware
router.use(async function (req, res, next) {

  req.branchId = "master";
  console.log(req.cookies);

  if (req.query.branchId)
  {
    req.branchId = req.query.branchId;
    res.cookie("ONETEAM_BRANCH_ID", req.query.branchId);
  }
  else if (req.cookies && req.cookies["ONETEAM_BRANCH_ID"])
  {
    req.branchId = req.cookies["ONETEAM_BRANCH_ID"];
  }

  next();
});

// List books
router.get('/books', async function(req, res) {
  let query = {
    _type: 'store:book'
  };
  if (req.query.tag)
  {
    query.tags = req.query.tag;
  }

  let books = await req.cloudcms.queryNodes(repositoryId, req.branchId, query);

  books.rows.forEach(function(book) {
    enhanceBook(book);
  });

  res.status(200).json(books.rows);
});

// // Read book
router.get('/books/:id', async function(req, res) {
  var node = await req.cloudcms.readNode(repositoryId, req.branchId, req.params.id);
  enhanceBook(node);
  
  res.status(200).json(node);
});

// List authors
router.get('/authors', async function(req, res) {
  let query = {
    _type: 'store:author'
  };

  let authors = await req.cloudcms.queryNodes(repositoryId, req.branchId, query);
  authors.rows.forEach(function(author) {
    enhanceAuthor(author);
  });
  
  res.status(200).json(authors.rows);
});

// General book search
router.get('/search', async function(req, res) {
  let text = req.query.text;
  let config = {
    search: text,
    query: {
      _type: 'store:book'
    }
  };
  let results = await req.cloudcms.findNodes(repositoryId, req.branchId, config);
  results.rows.forEach(function(book) {
    book.imageUrl = baseCdnUrl + "/store/books/" + book.slug + ".jpg";
  });

  res.status(200).json(results.rows);
});

// // List tags
router.get('/tags', async function(req, res) {
  let query = {
    _type: 'n:tag'
  };
  var pagination = {
    sort: {
      tag: 1
    }
  };
  var results = await req.cloudcms.queryNodes(repositoryId, req.branchId, query, pagination);

  res.status(200).json(results.rows);
});

// Fetch generic document
router.get("/resources/:id", async function(req, res) {
  var node = await req.cloudcms.readNode(repositoryId, req.branchId, req.params.id);
  
  res.status(200).json(node);
});

module.exports = router;
