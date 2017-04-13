// var AlbumList = require('./albumList')

var app = function(){
  var albumList = new AlbumList('https://api.spotify.com/v1/search?q=cats&type=album')
  albumList.getData()

  console.log(albumList.records)

  var info = document.querySelector('#albums');
  var albumDetailView = new AlbumDetailView(info, albumList.records[0]);


}



var AlbumList = function (url) {
  this.url = url;
  this.records=[];
  // this.onUpdate = null;
}

AlbumList.prototype = {

  getData: function () {
    var request = new XMLHttpRequest();

    request.open('GET', this.url);
  
    request.onload = function () {
      console.log(this.records)
      if (request.status !== 200) return;
        var jsonString = request.responseText;
        console.log(JSON.parse(jsonString))
       var r = JSON.parse(jsonString);
        this.records.push(r);
        console.log("this.records after push",this.records)

        // this.onUpdate();
    }.bind(this);
  
    request.send();
  }

};


var AlbumDetailView = function(outer, records){
  var pTag = document.createElement('p')
  displayString = ''
records.forEach(function(record){
  console.log(record)
  pTag.innerText = "Album Name: " +record.name + "\nArtist: " +  record.artists[0].name + "\n"
  var createA = document.create('a')
  createA.setAttribute("href", record.external_urls.spotify)
  pTag.appendChild(createA)
  outer.appendChild(pTag)
}.bind(this))

}


window.onload = app;