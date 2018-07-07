window.onload = function () {
    function checkOnVideo(file) {
        return file.type === "video/mp4" || file.type === "video/webm" || file.type === "video/ogg";
    }
    function checkOnPicture(file) {
        return file.type === "image/png" || file.type === "image/jpg" || file.type === "image/gif";
    }
    function checkOnAudio(file) {
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
        clearContent();
        var noResult = document.createElement("h3");
        noResult.className = "noResult";
        noResult.innerHTML = "No such files";
        document.getElementById("searchResult").insertBefore(noResult, null);
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
            // this.rating++;

            console.log("voteUp");
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
                   <p>Rating: <button class="voteUp")">Add</button>${this.rating}<button>Remove</button></p>
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
                 <p>Rating: <button class="voteUp">Add</button>${this.rating}<button>Remove</button></p>
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
                   <p>Rating: <button class="voteUp">Add</button>${this.rating}<button>Remove</button></p>
                   <p>Tags: ${this.tags}</p>
               </div>
            `;
        return embedVideo;
    };

    function ContentList() {
        this.fromLocalStorage();
    }
    ContentList.prototype = {
        addItem: function (content) {
            console.log(content);
            this.contentArr.push(content);
        },
        showItem: function() {
            clearContent();
            this.contentArr.forEach(function(item) {
                document.getElementById("content").insertBefore(item.show(), null);
            });
        },
        getVideo: function() {
            return this.contentArr.filter(function(item) {
                return item instanceof Video;
            });
        },
        getPicture: function() {
            return this.contentArr.filter(function(item) {
                return item instanceof Picture;
            });
        },
        getAudio: function() {
            return this.contentArr.filter(function(item) {
                return item instanceof Audio;
            });
        },
        findVideoName: function(value) {
            return this.getVideo().filter(function(item) {
                return item.name.includes(value);
            })
        },
        findVideoRating: function(value) {
            return this.getVideo().filter(function(item) {
                return item.rating >= value;
            })
        },
        findVideoTags: function(value) {
            return this.getVideo().filter(function(item) {
                return item.tags.includes(value);
            })
        },
        findVideoByNameAndTags: function(nameValue, tagsValue) {
            return this.findVideoName(nameValue).filter(function(item) {
                return item.tags.includes(tagsValue);
            })
        },
        findVideoByNameAndRating: function(nameValue, ratingValue) {
            return this.findVideoName(nameValue).filter(function(item) {
                return item.rating >= ratingValue;
            })
        },
        findVideoByRatingAndTags: function(ratingValue, tagsValue){
            return this.findVideoRating(ratingValue).filter(function(item) {
                return item.tags.includes(tagsValue);
            })
        },
        findVideoByNameRatingAndTags: function(nameValue, ratingValue, tagsValue){
            return this.findVideoByNameAndTags(nameValue, tagsValue).filter(function(item) {
                return item.rating >= ratingValue;
            })
        },
        findPictureName: function(value) {
            return this.getPicture().filter(function(item) {
                return item.name.includes(value);
            })
        },
        findPictureRating: function(value) {
            return this.getPicture().filter(function(item) {
                return item.rating >= value;
            })
        },
        findPictureTags: function(value) {
            return this.getPicture().filter(function(item) {
                return item.tags.includes(value);
            })
        },
        findPictureByNameAndTags: function(nameValue, tagsValue) {
            return this.findPictureName(nameValue).filter(function(item) {
                return item.tags.includes(tagsValue);
            })
        },
        findPictureByNameAndRating: function(nameValue, ratingValue) {
            return this.findPictureName(nameValue).filter(function(item) {
                return item.rating >= ratingValue;
            })
        },
        findPictureByRatingAndTags: function(ratingValue, tagsValue){
            return this.findPictureRating(ratingValue).filter(function(item) {
                return item.tags.includes(tagsValue);
            })
        },
        findPictureByNameRatingAndTags: function(nameValue, ratingValue, tagsValue){
            return this.findPictureByNameAndTags(nameValue, tagsValue).filter(function(item) {
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
                return document.getElementById("searchResult").insertBefore(outPut, null);
            }
        },
        fromLocalStorage: function () {
            if (localStorage.getItem('contentList')){
                this.contentArr = JSON.parse(localStorage.getItem('contentList'));
            }else {
                this.contentArr  = [];
            }
        },
        toLocalStorage: function() {
            if(this.contacts.length >= 0){
                localStorage.setItem('listOfContacts', JSON.stringify(this.contacts));
            }
        }

    };
    
    var contentList = new ContentList();
    contentList.showItem();

    document.getElementById("contentFormCreator").addEventListener('submit', function(event) {
        event.preventDefault();

        var binaryFilesData = [];
        var contentName = document.getElementById("contentName").value;
        var contentDescription = document.getElementById("contentDescription").value;
        var contentRating = 0;
        var contentTags = document.getElementById("contentTags").value;
        var inputAddedFile = document.getElementById("contentFile").files[0];
        binaryFilesData.push(inputAddedFile);
        var contentUrl = window.URL.createObjectURL(new Blob(binaryFilesData, {type : 'text/html'}));

        if (checkOnPicture(inputAddedFile)) {
            contentList.addItem(new Picture(contentName, contentDescription, contentRating, contentTags, contentUrl));
        }
        if (checkOnAudio(inputAddedFile)) {
            console.log(inputAddedFile.type);
            contentList.addItem(new Audio(contentName, contentDescription, contentRating, contentTags, contentUrl));
        }
        if (checkOnVideo(inputAddedFile)) {
            contentList.addItem(new Video(contentName, contentDescription, contentRating, contentTags, contentUrl));
        }
        contentList.showItem();
    });


    document.getElementById("findVideo").onclick = function () {
        clearSearchResult();
        var videoNameValue = document.getElementById("videoName").value;
        var videoRatingValue = document.getElementById("videoRating").value;
        var videoTagsValue = document.getElementById("videoTags").value;
        if (!videoNameValue && !videoRatingValue && !videoTagsValue) {
            return false
        }

        if (videoNameValue && videoRatingValue && videoTagsValue) {
            contentList.showResults(contentList.findVideoByNameRatingAndTags(videoNameValue, videoRatingValue, videoTagsValue));
        }else if (videoNameValue && videoRatingValue) {
            contentList.showResults(contentList.findVideoByNameAndRating(videoNameValue, videoRatingValue));
        }else if (videoNameValue && videoTagsValue) {
            contentList.showResults(contentList.findVideoByNameAndTags(videoNameValue, videoTagsValue));
        }else if (videoRatingValue && videoTagsValue) {
            contentList.showResults(contentList.findVideoByRatingAndTags(videoRatingValue, videoTagsValue));
        }else if (videoNameValue) {
            contentList.showResults(contentList.findVideoName(videoNameValue));
        }else if (videoRatingValue) {
            contentList.showResults(contentList.findVideoRating(videoRatingValue));
        }else {
            contentList.showResults(contentList.findVideoTags(videoTagsValue));
        }
    };
    document.getElementById("findPicture").onclick = function () {
        clearSearchResult();
        var pictureNameValue = document.getElementById("pictureName").value;
        var pictureRatingValue = document.getElementById("pictureRating").value;
        var pictureTagsValue = document.getElementById("pictureTags").value;
        if (!pictureNameValue && !pictureRatingValue && !pictureTagsValue) {
            return false
        }

        if (pictureNameValue && pictureRatingValue && pictureTagsValue) {
            contentList.showResults(contentList.findPictureByNameRatingAndTags(pictureNameValue, pictureRatingValue, pictureTagsValue));
        }else if (pictureNameValue && pictureRatingValue) {
            contentList.showResults(contentList.findPictureByNameAndRating(pictureNameValue, pictureRatingValue));
        }else if (pictureNameValue && pictureTagsValue) {
            contentList.showResults(contentList.findPictureByNameAndTags(pictureNameValue, pictureTagsValue));
        }else if (pictureRatingValue && pictureTagsValue) {
            contentList.showResults(contentList.findPictureByRatingAndTags(pictureRatingValue, pictureTagsValue));
        }else if (pictureNameValue) {
            contentList.showResults(contentList.findPictureName(pictureNameValue));
        }else if (pictureRatingValue) {
            contentList.showResults(contentList.findPictureRating(pictureRatingValue));
        }else {
            contentList.showResults(contentList.findPictureTags(pictureTagsValue));
        }
    };


};

