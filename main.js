window.onload = function () {
    function checkOnVideo(file) {
        if (!file || file === undefined) return;
        return file.type === "video/mp4" || file.type === "video/webm" || file.type === "video/ogg";
    }
    function checkOnPicture(file) {
        if (!file || file === undefined) return;
        return file.type === "image/png" || file.type === "image/jpg" || file.type === "image/gif";
    }
    function checkOnAudio(file) {
        if (!file || file === undefined) return;
        return file.type === "audio/mpeg" || file.type === "audio/ogg" || file.type === "audio/mp3";
    }
    function clearSearchResult() {
        var nodeSearchResult = document.getElementById("searchResult");
        while (nodeSearchResult.firstChild) {
            nodeSearchResult.removeChild(nodeSearchResult.firstChild);
        }
    }
    function clearContent() {
        var clearContent = document.getElementById("content");
        while (clearContent.firstChild) {
            clearContent.removeChild(clearContent.firstChild);
        }
    }
    function noSuchFiles() {
        document.querySelector(".back").style.visibility = "hidden";
        var noResult = document.createElement("h3");
        noResult.className = "noResult";
        noResult.innerHTML = "No such files. Back to content";
        noResult.addEventListener("click", function () {
            clearSearchResult();
            document.getElementById("content").style.display = "block";
        });
        document.getElementById("searchResult").insertBefore(noResult, null);
    }
    function backToContent() {
        document.querySelector(".back").style.visibility = "visible";
        document.querySelector(".back").addEventListener("click", function(event) {
            document.getElementById("content").style.display = "block";
            document.querySelector(".back").style.visibility = "hidden";
            event.target(clearSearchResult());

        })
    }

    function Content(name, description, rating, tags, url) {
        this.name = name;
        this.description = description;
        this.url = url;
        this.rating = rating;
        this.tags = tags;
    }

    Content.prototype = {
        constructor: Content,

        show: function(){
            throw new Error('');
        },
        voteUp: function() {
            this.rating++;
        },
        voteDown: function() {
            this.rating--;
        }
    };

    function Video(name, description, rating, tags, url) {
        Content.call(this, name, description, rating, tags, url);
    }
    Video.prototype = Object.create(Content.prototype);
    Video.prototype.constructor = Video;
    Video.prototype.show = function() {
        var embedVideo = document.createElement("div");
        embedVideo.className = "contentItem";
        embedVideo.innerHTML = `
               <div class="embedVideo">
                   <video controls>
                       <source src="${this.url}" type="video/mp4">
                       <source src="${this.url}" type="video/ogg">
                       <source src="${this.url}" type="video/webm">
                   </video>
               </div>
               <div class="props">
                   <h1>Name: ${this.name}</h1>
                   <h3>Description: ${this.description}</h3>
                   <p>Rating: <i class="far fa-thumbs-up btn_up"></i>${this.rating}<i class="far fa-thumbs-down btn_down"></i></p>
                   <p>Tags: ${this.tags}</p>
               </div>
        `;
        return embedVideo;
    };

    function Picture(name, description, rating, tags, url) {
        Content.call(this, name, description, rating, tags, url);
    }
    Picture.prototype = Object.create(Content.prototype);
    Picture.prototype.constructor = Picture;
    Picture.prototype.show = function() {
        var embedPicture = document.createElement("div");
        embedPicture.className = "contentItem";
        embedPicture.innerHTML = `
             <div class="embedPicture">
                <img src="${this.url}">
             </div>
             <div class="props">
                 <h1>Name: ${this.name}</h1>
                 <h3>Description ${this.description}</h3>
                 <p>Rating: <i class="far fa-thumbs-up btn_up"></i>${this.rating}<i class="far fa-thumbs-down btn_down"></i></p>
                 <p>Tags: ${this.tags}</p>
             </div>
           `;
        return embedPicture;
    };

    function Audio(name, description, rating, tags, url) {
        Content.call(this, name, description, rating, tags, url);
    }
    Audio.prototype = Object.create(Content.prototype);
    Audio.prototype.constructor = Audio;
    Audio.prototype.show = function() {
        var embedVideo = document.createElement("div");
        embedVideo.className = "contentItem";
        embedVideo.innerHTML = `
               <div>
                   <audio class="embedAudio" controls>
                       <source src="${this.url}" type="audio/ogg">
                       <source src="${this.url}" type="audio/mpeg">
                       <source src="${this.url}" type="audio/mp3">
                   </audio> 
               </div>
               <div class="props">
                   <h1>Name: ${this.name}</h1>
                   <h3>Description: ${this.description}</h3>
                   <p>Rating: <i class="far fa-thumbs-up btn_up"></i>${this.rating}<i class="far fa-thumbs-down btn_down"></i></p>
                   <p>Tags: ${this.tags}</p>
               </div>
            `;

        return embedVideo;
    };

    function ContentList(contentArr) {
        this.contentArr = contentArr;
    }
    ContentList.prototype = {
        addItem: function (content) {
            this.contentArr.push(content);
        },
        showItem: function() {
            clearContent();
            this.contentArr.forEach(function(item) {
                document.getElementById("content").insertBefore(item.show(), null);
            });
        },
        findContentByName: function(value) {
            return this.contentArr.filter(function(item) {
                return item.name.includes(value);
            })
        },
        findContentByRating: function(value) {
            return this.contentArr.filter(function(item) {
                return item.rating >= value;
            })
        },
        findContentByTags: function(value) {
            return this.contentArr.filter(function(item) {
                return item.tags.includes(value);
            })
        },
        findContentByNameAndTags: function(nameValue, tagsValue) {
            return this.findContentByName(nameValue).filter(function(item) {
                return item.tags.includes(tagsValue);
            })
        },
        findContentByNameAndRating: function(nameValue, ratingValue) {
            return this.findContentByName(nameValue).filter(function(item) {
                return item.rating >= ratingValue;
            })
        },
        findContentByRatingAndTags: function(ratingValue, tagsValue){
            return this.findContentByRating(ratingValue).filter(function(item) {
                return item.tags.includes(tagsValue);
            })
        },
        findContentByNameRatingAndTags: function(nameValue, ratingValue, tagsValue){
            return this.findContentByNameAndTags(nameValue, tagsValue).filter(function(item) {
                return item.rating >= ratingValue;
            })
        },
        showResults: function(arr) {
            var outPut = document.createElement("div");
            outPut.className = "outPutElem";
            document.getElementById("content").style.display = "none";
            if (arr.length == 0 || arr === undefined) {
                noSuchFiles();
            } else {
                arr.forEach(function (item) {
                    outPut.insertBefore(item.show(), null);
                });
                backToContent();
                return document.getElementById("searchResult").insertBefore(outPut, null);
            }
        }
    };

    var contentList = new ContentList([]);
    contentList.showItem();

    document.getElementById("createContent").addEventListener('click', function(event) {
        event.preventDefault();
        var contentName = document.getElementById("contentName").value;
        var contentDescription = document.getElementById("contentDescription").value;
        var contentRating = 0;
        var contentTags = document.getElementById("contentTags").value;
        var contentAddedFile = document.getElementById("contentFile").files[0];
        var contentUrl = window.URL.createObjectURL(new Blob([contentAddedFile], {type : 'text/html'}));

        if (checkOnPicture(contentAddedFile)) {
            contentList.addItem(new Picture(contentName, contentDescription, contentRating, contentTags, contentUrl));
        }
        if (checkOnAudio(contentAddedFile)) {
            contentList.addItem(new Audio(contentName, contentDescription, contentRating, contentTags, contentUrl));
        }
        if (checkOnVideo(contentAddedFile)) {
            contentList.addItem(new Video(contentName, contentDescription, contentRating, contentTags, contentUrl));
        }

        document.getElementById("contentCreatorForm").reset();
        contentList.showItem();
    });


    document.getElementById("findContent").addEventListener("click", function(event) {
        event.preventDefault();
        clearSearchResult();
        var contentSearchName = document.getElementById("contentSearchName").value;
        var contentSearchRating = document.getElementById("contentSearchRating").value;
        var contentSearchTags = document.getElementById("contentSearchTags").value;
        
        if (!contentSearchName && !contentSearchRating && !contentSearchTags) {
            return false;
        }else if (contentSearchName && contentSearchRating && contentSearchTags){
            contentList.showResults(contentList.findContentByNameRatingAndTags(contentSearchName, contentSearchRating, contentSearchTags));
        }else if (contentSearchName && contentSearchRating) {
            contentList.showResults(contentList.findContentByNameAndRating(contentSearchName, contentSearchRating));
        }else if (contentSearchName && contentSearchTags) {
            contentList.showResults(contentList.findContentByNameAndTags(contentSearchName, contentSearchTags))
        }else if (contentSearchRating && contentSearchTags) {
            contentList.showResults(contentList.findContentByRatingAndTags(contentSearchRating, contentSearchTags));
        }else if (contentSearchName) {
            contentList.showResults(contentList.findContentByName(contentSearchName));
        }else if (contentSearchRating) {
            contentList.showResults(contentList.findContentByRating(contentSearchRating));
        }else {
            contentList.showResults(contentList.findContentByTags(contentSearchTags));
        }

        document.getElementById("findContentForm").reset();
    });
};

