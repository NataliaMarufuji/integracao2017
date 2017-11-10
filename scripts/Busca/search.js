function displaySearchResults(results, docs) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
    var appendString = '';
    var numero = 0;

    for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var urlnow = results[i].ref;
        var item = getSingleDoc(docs, urlnow);
        numero += 1;
        appendString += '<li class="list-group-item"><a href="' + item.url + '">' + numero + ' - ' + item.nome + '</a>';
    }

    searchResults.innerHTML = appendString;
    } else {
    searchResults.innerHTML = '<li>Sem resultados encontrados.</li>';
    }
}

function getSingleDoc(docs, url) {
    for (var i = 0; i < docs.length; i++) {
        if (docs[i].url == url) {
            return docs[i];
        }
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');

        if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
        }
    }
}

var searchTerm = getQueryVariable('query');

if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('nome')
      this.ref('url')
      this.field('palavrasChave')

      window.documents.forEach(function (doc) {
        this.add(doc)
      }, this)
    })


    var results = idx.search(searchTerm); // Get lunr to perform a search
    displaySearchResults(results, window.documents);
}
