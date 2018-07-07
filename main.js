window.onload = function () {
    function checkOnVideo(url) {
        var urlVideoRegExp = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"'>]+)/;
        return urlVideoRegExp.test(String(url).toLocaleLowerCase());
    }
    function checkOnPicture(url) {
        var urlPictureRegExp = (/\.(gif|jpg|jpeg|tiff|png)$/i);
        return urlPictureRegExp.test(String(url).toLocaleLowerCase());
    }
    function checkOnAudio(url) {
        var urlAudioRegExp = /\.(?:wav|mp3|ogg)$/i;
        return urlAudioRegExp.test(String(url).toLocaleLowerCase());
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

    function Content(name, description, url, rating, tags) {
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

    function Video(name, description, url, rating, tags) {
        Content.call(this, name, description, url, rating, tags);
    }
    Video.prototype = Object.create(Content.prototype);
    Video.prototype.constructor = Video;
    Video.prototype.show = function() {
        var embedVideo = document.createElement("div");
        embedVideo.className = "contentItem";
        embedVideo.innerHTML = `
               <div  class="embedVideo">
                    <iframe src="${this.url}" allowfullscreen></iframe>
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

    function Picture(name, description, url, rating, tags) {
        Content.call(this, name, description, url, rating, tags);
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

    function Audio(name, description, url, rating, tags) {
        Content.call(this, name, description, url, rating, tags);
    }
    Audio.prototype = Object.create(Content.prototype);
    Audio.prototype.constructor = Audio;
    Audio.prototype.show = function() {
        var embedVideo = document.createElement("div");
        embedVideo.className = "contentItem";
        embedVideo.innerHTML = `
               <audio class="embedAudio">
                   <source src="${this.url}" type="audio/ogg">
                   <source src="${this.url}" type="audio/mpeg">
                   <source src="${this.url}" type="audio/wav  ">
               </audio>
               <div class="props">
                   <h1>Name: ${this.name}</h1>
                   <h3>Description: ${this.description}</h3>
                   <p>Rating: <button class="voteUp">Add</button>${this.rating}<button>Remove</button></p>
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
            this.contentArr.forEach(function (item) {
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
        }

    };
    var pic = new Picture("name", "jesus", "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg", 1250, "#picture");
    var pic1 = new Picture("man", "jesus", "https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg", 1765, "#picture, #animal");
    var vid = new Video("Vance Joy - 'Riptide' Official Video", "jesus", "https://www.youtube.com/embed/uJ_1HMAGb4k", 2000, "#video");
    var contentList = new ContentList([pic, pic1, vid]);
    contentList.showItem();

    document.getElementById("createContent").onclick = function() {
        var contentName = document.getElementById("contentName").value;
        var contentDescription = document.getElementById("contentDescription").value;
        var contentUrl = document.getElementById("contentUrl").value;
        var contentTags = document.getElementById("contentTags").value;
        var contentRating = 0;

        if (!contentName || !contentUrl) {
            return false;
        }

        if (checkOnVideo(contentUrl)) {
            contentList.addItem(new Video(contentName, contentDescription, contentUrl, contentRating, contentTags));
        }
        if (checkOnPicture(contentUrl)) {
            contentList.addItem(new Picture(contentName, contentDescription, contentUrl, contentRating, contentTags));
        }
        if (checkOnAudio(contentUrl)) {
            contentList.addItem(new Audio(contentName, contentDescription, contentUrl, contentRating, contentTags));
        }
        contentList.showItem();
    };

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

    // function hello() {
    //     console.log('sd');
    // }
    //
    // var buttons = document.querySelectorAll(".props .voteUp");
    // buttons.forEach(function(btn) {
    //     btn.addEventListener('click', );
    // })

};

