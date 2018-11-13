Gitana.connect({
    "clientKey": "",
    "clientSecret": "",
    "username": "",
    "password": "",
    "baseURL": "",
    "application": ""
}, function(err) {

    var path = window.location.pathname;
    var id = window.location.search.substring(4);

    if(path == "/")
    {
        var authors =[];
    
        this.datastore("content").readBranch("master").queryNodes({
                "_type": "store:author"
            }).each(function() {
                authors.push({
                    "title": this.title,
                    "nodeId": this._doc,
                    "QName": this.getQName(),
                    "repositoryId": this.getRepositoryId(),
                    "branchId": this.getBranchId(),
                    "imageURL": 'http://localhost/proxy/repositories/' + this.getRepositoryId() + '/branches/' + this.getBranchId() + '/nodes/' + this._doc + '/attachments/default'

                });
            }).then(function () {
                $("textarea").append(JSON.stringify(this, null, "  "));
                var templateHtml = $("#author-list").html();
                var templateFn = Handlebars.compile(templateHtml);
                var model = {
                    items : authors
                };
                var html = templateFn(model);
                $("ol").append(html);
            });

        var books =[];
            this.datastore("content").readBranch("master").queryNodes({
                "_type": "store:book"
            }).each(function() {
                books.push({
                    "title": this.title,
                    "nodeId": this._doc,
                    "author": this.author,
                    "QName": this.getQName(),
                    "repositoryId": this.getRepositoryId(),
                    "branchId": this.getBranchId(),
                    "imageURL": 'http://localhost/proxy/repositories/' + this.getRepositoryId() + '/branches/' + this.getBranchId() + '/nodes/' + this._doc + '/attachments/default'
                });
            }).then(function () {
                var templateHtml = $("#books-list").html();
                var templateFn = Handlebars.compile(templateHtml);
                var model = {
                    items : books
                };
                var html = templateFn(model);
                $("data").append(html);
            });
    }


    if(path == "/author.html")
    {
        this.datastore("content").readBranch("master").queryNodes({
            "_doc": id
        }).then(function () {
            var author = this[id];
            var templateHtml = $("#author").html();
            var templateFn = Handlebars.compile(templateHtml);
            var model = {
                "title" : author.title,
                "firstName" : author.firstName,
                "lastName" : author.lastName,
                "imageURL": 'http://localhost/proxy/repositories/' + author.getRepositoryId() + '/branches/' + author.getBranchId() + '/nodes/' + author._doc + '/attachments/default',
            };
            var html = templateFn(model);
            $("data").append(html);
        });
    }

    if(path == "/book.html")
    {
        var array =[];
        this.datastore("content").readBranch("master").queryNodes({
            "_doc": id
        }).then(function () {
            var book = this[id];
            var author = this[id].author.reference;
            var result= author.split('/');
            var authorName = this[id].author.title.split(' ');
            var firstName = authorName[authorName.length-2];
            var lastName = authorName[authorName.length-1];
            var templateHtml = $("#book").html();
            var templateFn = Handlebars.compile(templateHtml);
            var model = {
                "title" : book.title,
                "author" : book.author.title,
                "imageURL": 'http://localhost/proxy/repositories/' + book.getRepositoryId() + '/branches/' + book.getBranchId() + '/nodes/' + book._doc + '/attachments/default',
                "description": book.description,
                "recommendations": book.recommendations,
                "firstName" : firstName,
                "lastName" : lastName,
                "authorImageURL": 'http://localhost/proxy/repositories/' + result[result.length-3] + '/branches/' + result[result.length-2] + '/nodes/' + result[result.length-1] + '/attachments/default'
            };
            var html = templateFn(model);
            $("data").append(html);
        });
    }
});