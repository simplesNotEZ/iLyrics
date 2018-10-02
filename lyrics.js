const form = document.querySelector("form");
const albumsButt = document.getElementsByClassName("albumsButton")[0];
albumsButt.addEventListener("click", getAlbums);
const songsButt1 = document.getElementById("songsButton1");
songsButt1.addEventListener("click", getSongs);
const albumDropdown = document.getElementById("albumDropdownElement");
const artist = document.getElementsByClassName("artistInput")[0];
const albumSongs = document.getElementById("albumSongs");
albumSongs.addEventListener("click", getAlbumSongs);

function getAlbums() {
    if (artist.value === "") {
        artist.setAttribute("placeholder", "You must enter an artist!");
    } 
    else {
        const GETurl = "https://itunes.apple.com/search?term=" + artist.value + "&limit=200";
        const defaultOption = document.createElement("option");
        defaultOption.innerHTML = "Select a " + artist.value + " album";
        defaultOption.setAttribute("id", "defaultOption");
        defaultOption.setAttribute("value", "defaultOption");
        albumDropdown.appendChild(defaultOption);
                        
        fetch(GETurl)
            .then(response => response.json())
            .then(function(json) {
                return json;
            })
            .then(function(json) {
                var albumArr1 = [];
                json.results.filter(function(dataItem, index, arr) {
                    if (albumArr1.length === 0) {
                        albumArr1.push(dataItem.collectionName);
                    } else if (!(arr[index - 1].collectionName === dataItem.collectionName)) {
                        albumArr1.push(dataItem.collectionName);
                    }                    
                    return albumArr1;
                })
                return albumArr1;
            })
            .then(function(albumArr1) {
                const albumArr2 = albumArr1.filter(function(dataItem, index, arr) {
                    if (albumArr1.indexOf(dataItem) === index) {
                        return dataItem;
                    }
                }) 
                return albumArr2;
            })
            .then(function(albumArr2) {
                albumArr2.forEach(function(album) {
                    let albumOption = document.createElement("option");
                    albumOption.classList.add("albumOption");
                    albumOption.innerHTML = album;
                    albumOption.value = album;
                    albumDropdown.appendChild(albumOption);
                })
            })
    }
}


const songsDropdown = document.getElementById("songsDropdownElement");

function songsDropdownSetup() {     
    const defaultOption = document.createElement("option");
    defaultOption.innerHTML = "Select a " + artist.value + " song";
    defaultOption.setAttribute("id", "defaultOption");
    defaultOption.setAttribute("value", "defaultOption");
    songsDropdown.appendChild(defaultOption);
}

function songsFetchByArtist() { 
    const GETurl = "https://itunes.apple.com/search?term=" + artist.value + "&limit=200";
    fetch(GETurl)
        .then(response => response.json())
        .then(function(json) {
            return json;
        })
        .then(function(json) {
            var songArr1 = [];
            json.results.filter(function(dataItem, index, arr) {
                if (songArr1.length === 0) {
                    songArr1.push(dataItem.trackName);
                } else if (!(arr[index - 1].trackName === dataItem.trackName)) {
                    songArr1.push(dataItem.trackName);
                }                    
                return songArr1;
            })
            return songArr1;
        })
        .then(function(songArr1) {
            const songArr2 = songArr1.filter(function(song, index) {
                if (songArr1.indexOf(song) === index) {
                    return song;
                }
            }) 
            return songArr2;
        })
        .then(function(songArr2) {
            songArr2.forEach(function(song) {
                let songOption = document.createElement("option");
                songOption.innerHTML = song;
                songOption.classList.add("songOption");
                songOption.setAttribute("value", song);
                songsDropdown.appendChild(songOption);
            })
        })
}

const albumInput = document.getElementsByClassName("albumInput")[0];

function songsFetchByAlbum() {
    const GETurl = "https://itunes.apple.com/search?term=" + artist.value + "&limit=200";
    fetch(GETurl)
        .then((response) => response.json()) 
        .then(function(json) {
            return json;
        })
        .then(function(json) {
            let songArr1 = json.results.reduce(function(acc, dataItem, index, arr) {
                if (albumDropdown.value !== "") {
                    if (dataItem.collectionName === albumDropdown.value) {
                        acc.push(dataItem.trackName);
                    }
                    return acc;
                } else {
                    if (dataItem.collectionName === ("\"" + albumInput.value + "\"")) {
                        acc.push(dataItem.trackName);
                    }
                    return acc;
                }
            }, [])
            if (songArr1.length === 0) {
                alert("Please enter an album title in it's most \"correct\" format. You know: check spelling, capitalization, and spacing.");
            }
            return songArr1;
        })
        .then(function(songArr1) {
            const songArr2 = songArr1.filter(function(song, index) {
                if (songArr1.indexOf(song) === index) {
                    return song;
                }
            }) 
            return songArr2;
        })
        .then(function(songArr2) {
            songArr2.forEach(function(song) {
                let songOption = document.createElement("option");
                songOption.innerHTML = song;
                songOption.value = song;
                songsDropdown.appendChild(songOption);
            })
        })
}

function getSongs() {
    if (artist.value === "") {
        artist.setAttribute("placeholder", "You must enter an artist!");
    } 
    else {
        songsDropdownSetup();
        songsFetchByArtist();
    }
}

function getAlbumSongs() {
    if (artist.value === "") {
        alert("Please enter an artist's name first.");
    } else if (albumInput.value === "") {
        alert("Please enter an album name first.");
    } else {
        songsDropdownSetup();
        songsFetchByAlbum();
    }
}

const songInput = document.getElementById("songInput");
const gotSongPgraph = document.getElementById("gotSongParagraph");
const artistsPgraph = document.getElementById("byArtists");
const notQuitePgraph = document.getElementById("notQuite");
const enterArtistPgraph = document.getElementById("enterArtist");
const pGraphsList = document.querySelector("ul");


function checkItunes(GETurl) {
    fetch(GETurl)
        .then((response) => response.json()) 
        .then(function(json) {
            return json.results.filter(function(trackInfo) {
                if (songInput.value !== "") {
                    return trackInfo.trackName === songInput.value;
                } else if (songsDropdown.value !== "defaultOption") {
                    return trackInfo.trackName === songsDropdown.value;
                }
            })            
        })
        .then(function(matchingTracksArr) {
            return matchingTracksArr.map(function(track) {
                return track.artistName;
            })
        })
        .then(function(artistArr) {
            const saughtSongArtists = artistArr.filter(function(artist, index) {
                if (artistArr.indexOf(artist) === index) {
                    return artist;
                }
            }) 
            return saughtSongArtists;
        })
        .then(function(saughtSongArtists) {
            if (saughtSongArtists.length > 0) {
                pGraphsList.classList.add("pGraphsList");
                if (songInput.value !== "") {
                    gotSongPgraph.textContent = "iTunes has the song you're looking for-- " + songInput.value + "."; 
                } else {
                    gotSongPgraph.textContent = "iTunes has the song you're looking for-- " + songsDropdown.value + ".";
                }
                artistsPgraph.textContent = "The song you seek is listed under the following artists:   " + saughtSongArtists;                    
                notQuitePgraph.textContent = "Not what you're looking for?  Use our search tools above to refine your search.";
                enterArtistPgraph.textContent = "If this is what you want, enter the artist in the artist field and then click on \"Get Lyrics\" button above to get the lyrics.";
            } else {
                gotSongPgraph.textContent = "Shoot, it doesn't look like iTunes has your song.  Check your spelling, spacing, and capitilization.";
            }
        })
}

const findSongButt = document.getElementById("findSongButt");
findSongButt.addEventListener("click", hasSong);

function hasSong() {
    if ((songInput.value === "") && (songsDropdown.hasChildNodes() === false)) {
        songInput.setAttribute("placeholder", "You must enter a song title or select one first!");
    } else if ((songInput.value === "") && (songsDropdown.value === "defaultOption")) {
        songInput.setAttribute("placeholder", "You must enter a song title or select one first!");
    }  else {
        if (songInput.value !== "") {
            const GETurl = "https://itunes.apple.com/search?term=" + songInput.value + "&limit=200";
            checkItunes(GETurl);
        } else {
            const GETurl = "https://itunes.apple.com/search?term=" + songsDropdown.value + "&limit=200";
            checkItunes(GETurl);
        }  
    }      
}

const songTitle = document.getElementsByClassName("songTitle")[0];
const songArtist = document.getElementsByClassName("artistName")[0];
const lyricsParagraph = document.getElementsByClassName("lyrics-p")[0];

function fetchLyrics(url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            return json;
        })
        .then(function(json) {
            songArtist.textContent = artist.value;
            if (songInput.value !== "") {
                songTitle.textContent =  songInput.value;
            } else if (songsDropdown.value !== "defaultValue") {
                songTitle.textContent = songsDropdown.value;
            }
            lyricsParagraph.textContent = json.lyrics;
        })
}

const radLyricsButt = document.getElementById("lyricsButton");
radLyricsButt.addEventListener("click", getLyrics);

function getLyrics(event) {
    event.preventDefault();
    if (artist.value === "") {
        artist.setAttribute("placeholder", "You must enter an artist!");
        alert("You must enter an artist first.");
    } else if ((songInput.value === "") && ((songsDropdown.hasChildNodes() === false) || (songsDropdown.value === "defaultOption"))) {
        alert("You must enter or select a song first!");
    }
    else if ((artist.value !== "") && (songInput.value !== "")) {
        const lyricsUrl = "https://api.lyrics.ovh/v1/" + artist.value + "/" + songInput.value;
        fetchLyrics(lyricsUrl);
    } else if ((artist.value !== "") && (songsDropdown.value !== "defaultValue")) {
        const lyricsUrl = "https://api.lyrics.ovh/v1/" + artist.value + "/" + songsDropdown.value;
        fetchLyrics(lyricsUrl);
    }
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetForm);

function resetForm() {
    form.reset();
    var listOfAlbums = document.getElementById("albumDropdownElement");
    while (listOfAlbums.hasChildNodes()) {   
        listOfAlbums.removeChild(listOfAlbums.firstChild);
    } 
    var listOfSongs = document.getElementById("songsDropdownElement");
    while (listOfSongs.hasChildNodes()) {
        listOfSongs.removeChild(listOfSongs.firstChild);
    }
}