"use strict";

// Global variables
const prefix = "crl3554-";

// Local storage variables
const searchTermKey = prefix + "amiiboApiSearchTerm";
const storedSearchTerm = localStorage.getItem(searchTermKey);

const storedGameSeriesKey = prefix + "amiiboApiGameSeries";
const storedGameSeries = localStorage.getItem(storedGameSeriesKey);

const storedAmiiboSeriesKey = prefix + "amiiboApiAmiiboSeries";
const storedAmiiboSeries = localStorage.getItem(storedGameSeriesKey);

const storedAmiiboTypeKey = prefix + "amiiboApiType";
const storedAmiiboType = localStorage.getItem(storedAmiiboTypeKey);

const storedAmiiboHeadKey = prefix + "amiiboHead";
const storedAmiiboHead = localStorage.getItem(storedAmiiboHeadKey);

const storedAmiiboTailKey = prefix + "amiiboTail";
const storedAmiiboTail = localStorage.getItem(storedAmiiboTailKey);

// Decides what to display upon result
// Possible values: gallery, info
const lastSearchResultTypeKey = prefix + "lastSearchResultType";
const storedLastSearchResultType = localStorage.getItem(lastSearchResultTypeKey);


// Arrays of search specification parameters
let gameSeries = [];
let amiiboSeries = [];
let amiiboTypes = [];

// Type of search that will occur
// Possible values: search/random/all/newest
let protocol = "";

window.onload = (e) => {
    // Fill up the dropdown options
    searchDropDownInfo();

    // If there is stored data
    if (storedSearchTerm) {
        // Update status UI
        createStatusDiv().innerHTML = "Pulling stored data<img src='media/spinner.gif' alt=''>";
    }

    // Gets the time it took to execute all code up to here
    // and adds a starting cushion
    let delay = performance.now() + 500;

    // To make the code wait for the information to be read
    setTimeout(() => {
        // If there was previously stored data, use it
        if (storedGameSeries) {
            document.querySelector("#game-series").value = storedGameSeries;
        }
        if (storedAmiiboSeries) {
            document.querySelector("#amiibo-series").value = storedAmiiboSeries;
        }
        if (storedAmiiboType) {
            document.querySelector("#type").value = storedAmiiboType;
        }
        if (storedLastSearchResultType == "gallery") {
            if (storedSearchTerm) {
                document.querySelector("#search-bar").value = storedSearchTerm;
                searchAmiiboCharacter(storedSearchTerm);
            }
        }
        else if (storedLastSearchResultType == "info") {
            if (storedSearchTerm) {
                document.querySelector("#search-bar").value = storedSearchTerm;
                searchAmiiboCharacter(storedSearchTerm);
            }
            if (storedAmiiboHead && storedAmiiboTail) {
                searchAmiiboID(storedAmiiboHead, storedAmiiboTail)
            }
        }

    }, delay);

    // Attach functions to button events
    document.querySelector("#go").onclick = searchUserInput;
    document.querySelector("#random-amiibo").onclick = randomizeAmiibo;
    document.querySelector("#show-all").onclick = showAll;
    document.querySelector("#newest-releases").onclick = searchNewestReleases;

    // Makes it possible to search pressing enter as well
    document.querySelector("#search-area input[type='text']").addEventListener("keydown", e => {
        if (e.keyCode == 13 && !e.shiftKey)
            searchUserInput();
    });
}

// Cleans user input and searches for that character
function searchUserInput() {

    // Get the search term
    let searchTerm = document.querySelector("#search-bar").value;

    // Clean user input
    searchTerm = searchTerm.trim();                                 // gets rid of leading/trailing spaces
    searchTerm = encodeURIComponent(searchTerm);                    // encode spaces and special chars

    // If there's no term exit the function early
    if (searchTerm.length < 1) return;

    // Send user input
    searchAmiiboCharacter(searchTerm);
}

// Retrieves a random amiibo from AmiiboAPI
function randomizeAmiibo() {
    // Clear search string
    document.querySelector("#search-bar").value = "";

    // Query string to be sent in the URL
    let queryString;

    // Grabs the list of all amiibo characters
    queryString = "amiibo/?";

    // Append any search parameters selected
    queryString += addParametersToSearch();

    // Update status UI
    createStatusDiv().innerHTML = "Randomizing...<img src='media/spinner.gif' alt=''>";

    // Set the protocol
    protocol = "random";

    // Send query string into the retrieveApiData() function
    retrieveApiData(queryString);
}

function randomIndex(amiiboList) {
    // Returns a random amiibo from the amiiboList
    return amiiboList[Math.floor(Math.random() * amiiboList.length)];
}

// Searches for all amiibos with the specified parameters
function showAll() {
    // Clear search string
    document.querySelector("#search-bar").value = "";

    // Query string to be sent in the URL
    let queryString;

    // Grabs the list of all amiibo characters
    queryString = "amiibo/?";

    // Append any search parameters selected
    queryString += addParametersToSearch();

    // Update status UI
    createStatusDiv().innerHTML = "Retrieving all...<img src='media/spinner.gif' alt=''>";

    // Set the protocol
    protocol = "all";

    // Send query string into the retrieveApiData() function
    retrieveApiData(queryString);
}

// Searches for the 10 newest amiibos released
function searchNewestReleases() {
    // Clear search string
    document.querySelector("#search-bar").value = "";

    // Query string to be sent in the URL
    let queryString;

    // Grabs the list of all amiibo characters
    queryString = "amiibo/?";

    // Update status UI
    createStatusDiv().innerHTML = "Retrieving newest...<img src='media/spinner.gif' alt=''>";

    // Set the protocol
    protocol = "newest";

    // Send query string into the retrieveApiData() function
    retrieveApiData(queryString);
}

// Receives a character string and searches for it using a queryString
function searchAmiiboCharacter(character) {
    // Query string to be sent in the URL
    let queryString;

    // Append the search term to the URL - 'character' is a parameter
    queryString = "amiibo/?character=" + character;

    // Append any search parameters selected
    queryString += addParametersToSearch();

    // Update status UI
    createStatusDiv().innerHTML = "Searching...<img src='media/spinner.gif' alt=''>";

    // Set the protocol
    protocol = "search"

    // Send query string into the retrieveApiData() function
    retrieveApiData(queryString);
}

// Receives a amibo ID and searches for it
function searchAmiiboID(head, tail) {
    // Query string to be sent in the URL
    let queryString;

    // Append the search term to the URL - 'character' is a parameter
    queryString = `amiibo/?head=${head}&tail=${tail}`;

    // Update status UI
    createStatusDiv().innerHTML = "Searching...<img src='media/spinner.gif' alt=''>";

    // Set the protocol
    protocol = "search"

    // Send query string into the retrieveApiData() function
    retrieveApiData(queryString);
}

// Searches api for all game series
function searchGameSeries() {
    // Query string to be sent in the URL
    let queryString;

    // Append the 'type' parameter to the URL
    queryString = "gameseries";

    retrieveApiData(queryString);
}

// Searches api for all amiibo series
function searchSeries() {
    // Query string to be sent in the URL
    let queryString;

    // Append the 'type' parameter to the URL
    queryString = "amiiboseries";

    retrieveApiData(queryString);
}

// Searches api for all amiibo types
function searchTypes() {
    // Query string to be sent in the URL
    let queryString;

    // Append the 'type' parameter to the URL
    queryString = "type";

    retrieveApiData(queryString);
}

// Searches all api categorical info
// synchronizes the setDropdown function
function searchDropDownInfo() {
    searchGameSeries();
    searchSeries();
    searchTypes();

    // Gets the time it took to execute all code up to here
    // and adds a starting cushion
    let delay = performance.now() + 500;

    // To make the code wait for the information to be read
    setTimeout(() => {
        setDropDownInformation();
    }, delay);
}

function retrieveApiData(queryString, ) {
    // Get the AmiiboAPI Search endpoint
    const API_URL = "https://www.amiiboapi.com/api/";

    // Build URL string
    let url = API_URL + queryString;

    // Request data
    getData(url);
}

// Downloads the data from the URL
function getData(url) {
    // Function to use upon success
    let functionToUse;

    // Use the right function according to the URL
    if (url.includes("/gameseries"))
        functionToUse = retrieveGameSeries;
    else if (url.includes("/amiiboseries"))
        functionToUse = retrieveAmiiboSeries;
    else if (url.includes("/type"))
        functionToUse = retrieveTypes;
    else
        functionToUse = displayAmiibos;

    // Ajax request
    let results = $.ajax({
        dataType: "json",
        url: url,
        success: functionToUse,
        error: jsonError
    });
}

// Called if data was successfully extracted
function displayAmiibos(obj) {
    clearAll()

    let results = obj.amiibo;

    // If there are no results, print a status message and return
    if (results.length < 1) {
        createStatusDiv().innerHTML = "No search results found";
        return;
    }
    if (protocol == "search") {
        // If there is only one result, display that amiibos information
        if (results.length == 1) {
            displayAmiiboInfo(results[0]);
            localStorage.setItem(storedAmiiboHeadKey, results[0].head);
            localStorage.setItem(storedAmiiboTailKey, results[0].tail);
            localStorage.setItem(lastSearchResultTypeKey, "info");
            destroyStatusDiv();
        }
        // If there are many, display a gallery
        else {
            displayGallery(results);
            localStorage.setItem(lastSearchResultTypeKey, "gallery");
            destroyStatusDiv();
        }
    }
    if (protocol == "random") {
        let amiibo = randomIndex(results);
        searchAmiiboID(amiibo.head, amiibo.tail)
        localStorage.setItem(storedAmiiboHeadKey, amiibo.head);
        localStorage.setItem(storedAmiiboTailKey, amiibo.tail);
        localStorage.setItem(lastSearchResultTypeKey, "info");
    }
    if (protocol == "all") {
        // If there is only one result, display that amiibos information
        if (results.length == 1) {
            displayAmiiboInfo(results[0]);
            localStorage.setItem(storedAmiiboHeadKey, results[0].head);
            localStorage.setItem(storedAmiiboTailKey, results[0].tail);
            localStorage.setItem(lastSearchResultTypeKey, "info");
            destroyStatusDiv();
        }
        // If there are many, display a gallery
        else {
            displayGallery(results);
            localStorage.setItem(lastSearchResultTypeKey, "gallery");
            destroyStatusDiv();
        }
    }
    if (protocol == "newest") {
        // Sort results from newest to oldest
        results = results.sort(function (a, b) {
            let aRelease = Object.values(a.release);
            let bRelease = Object.values(b.release);

            // Compare us, eu, ja, etc.. dates
            aRelease = aRelease.filter(c => c).sort((c, d) => sortDates(c, d));
            bRelease = bRelease.filter(c => c).sort((c, d) => sortDates(c, d));

            return sortDates(aRelease[0], bRelease[0]);
        });

        let newestResults = results.slice(0, 10);
        displayGallery(newestResults);
        localStorage.setItem(lastSearchResultTypeKey, "gallery");
        destroyStatusDiv();
    }

    // Store data for future visits
    localStorage.setItem(searchTermKey, document.querySelector("#search-bar").value);
    localStorage.setItem(storedGameSeriesKey, document.querySelector("#game-series").value);
    localStorage.setItem(storedAmiiboSeriesKey, document.querySelector("#amiibo-series").value);
    localStorage.setItem(storedAmiiboTypeKey, document.querySelector("#type").value);
}

// Retrieves all game series existing on the api
function retrieveGameSeries(obj) {
    // Push every game series into array
    for (let amiibo of obj.amiibo) {
        if (!gameSeries.includes(amiibo.name))
            gameSeries.push(amiibo.name);
    }
}

// Retrieves all amiibo series existing on the api
function retrieveAmiiboSeries(obj) {
    // Push every amiibo series into array
    for (let amiibo of obj.amiibo) {
        if (!amiiboSeries.includes(amiibo.name))
            amiiboSeries.push(amiibo.name);
    }
}

// Retrieves all amiibo types existing on the api
function retrieveTypes(obj) {
    // Push every amiibo type into array
    for (let amiibo of obj.amiibo) {
        if (!amiiboTypes.includes(amiibo.name))
            amiiboTypes.push(amiibo.name);
    }
}

// Sets all the information retrieved into the drop down menus
function setDropDownInformation() {
    for (let i = 0; i < gameSeries.length; i++) {
        document.querySelector("#game-series").innerHTML += `<option value="${gameSeries[i]}">${gameSeries[i]}</option>`
    }
    ;

    for (let amiibo of amiiboSeries) {
        document.querySelector("#amiibo-series").innerHTML += `<option value="${amiibo}">${amiibo}</option>`;
    }

    for (let type of amiiboTypes) {
        document.querySelector("#type").innerHTML += `<option value="${type}">${type}</option>`;
    }
}

// Applies paremeters selected to the search
function addParametersToSearch() {
    // Get every drop down
    let gameSeriesDropDown = document.querySelector("#game-series");
    let amiiboSeriesDropDown = document.querySelector("#amiibo-series");
    let typeDropDown = document.querySelector("#type");

    let returnParameters = "";

    // Check for paremeters to apply
    if (gameSeriesDropDown.value != "any")
        returnParameters += "&gameseries=" + gameSeriesDropDown.value;
    if (amiiboSeriesDropDown.value != "any")
        returnParameters += "&amiiboSeries=" + amiiboSeriesDropDown.value;
    if (typeDropDown.value != "any")
        returnParameters += "&type=" + typeDropDown.value;

    // No paremeter was checked
    return returnParameters;
}

// Displays error message
function jsonError(objRequest) {
    console.clear(); // to avoid 404 console logs stacking up
    clearAll();
    destroyStatusDiv();
    createStatusDiv().innerHTML = "No search results found";
}

// Displays gallery of results to the user
function displayGallery(amiibos) {
    // Provide feedback about search
    if (document.querySelector("#search-bar").value.trim() != "")
        document.querySelector("#showing-results").innerHTML = `Search results for - ${document.querySelector("#search-bar").value}`;

    // Create a container string
    let htmlString = "";

    // Make a div for every amiibo with their name and picture
    for (let amiibo of amiibos) {
        htmlString +=
            `<div id="gallery-item">
                <img src="${amiibo.image}" alt="">
                <h2>${amiibo.name}</h2>
                <span id="head" class="hide">${amiibo.head}</span>
                <span id="tail" class="hide">${amiibo.tail}</span>
            </div>`;
    }

    // Get the results gallery
    let resultsGallery = document.querySelector("#results-gallery");

    // Add the HTML to the results gallery
    resultsGallery.innerHTML = htmlString;

    // Attach displayAmiiboInfo() function to every amiibo div
    for (let amiibo of resultsGallery.children) {
        amiibo.onclick = galleryIconClicked;
    }
}

// Displays the information for the amiibo selected
function displayAmiiboInfo(amiibo) {
    clearGallery();

    // Create a container string
    let htmlString =
        `<div id="amiibo">
            <h2>${amiibo.name}</h2>
            <img src="${amiibo.image}" alt="">
            </div>
            <div id="info">
            <ul id="info-list">
                <li><h3>Amiibo Series:</h3>${amiibo.amiiboSeries}</li>
                <li><h3>Game Series:</h3>${amiibo.gameSeries}</li>
                <li><h3>Type:</h3>${amiibo.type}</li>
                <li><h3>Releases:</h3>
                    <ul id="dates-list">
                    </ul>
                </li>
            </ul>
        </div>`;

    // Add info
    document.querySelector("#amiibo-info").innerHTML = htmlString;

    // Append the existing release dates
    if (amiibo.release.au)
        document.querySelector("#dates-list").innerHTML += `<li><img src="media/flags/australia.svg" alt="">Australia: ${amiibo.release.au}</li>`;
    if (amiibo.release.eu)
        document.querySelector("#dates-list").innerHTML += `<li><img src="media/flags/european-union.svg" alt="">Europe: ${amiibo.release.eu}</li>`;
    if (amiibo.release.jp)
        document.querySelector("#dates-list").innerHTML += `<li><img src="media/flags/japan.svg" alt="">Japan: ${amiibo.release.jp}</li>`;
    if (amiibo.release.na)
        document.querySelector("#dates-list").innerHTML += `<li><img src="media/flags/united-states.svg" alt="">North America: ${amiibo.release.na}</li>`;

    document.querySelector("#info").innerHTML += "<button id='amazon-search'>Amazon Search</button>"
    document.querySelector("#amazon-search").onclick = function () {
        if (amiibo.type == "Card")
            amazonSearch(`${amiibo.name} card`);
        else
            amazonSearch(amiibo.name);
    };
}

// Parses gallery icon clicked into an ID and searches
// the API for the Amiibo with that ID
function galleryIconClicked(e) {
    // Get the parent of whatever was clicked to get the div itself
    let amiiboClicked = e.target.parentElement;

    // Return the amiibo desired from the API
    return searchAmiiboID(amiiboClicked.querySelector("#head").innerHTML, amiiboClicked.querySelector("#tail").innerHTML);
}

// Removes all HTML from results gallery
function clearGallery() {
    document.querySelector("#showing-results").innerHTML = "";
    document.querySelector("#results-gallery").innerHTML = "";
}

// Removes all HTML from amiibo info
function clearAmiiboInfo() {
    document.querySelector("#amiibo-info").innerHTML = "";
}

// Removes all HTML in content area
function clearAll() {
    clearGallery();
    clearAmiiboInfo();
}

// Creates the status div and prepends it to main
function createStatusDiv() {
    let status = document.createElement("div");
    status.id = "status";
    document.querySelector("main").prepend(status);
    return status;
}

// Removes status div from the DOM
function destroyStatusDiv() {
    let arrayOfStatuses = document.querySelectorAll("#status");

    for (let status of arrayOfStatuses) {
        document.querySelector("main").removeChild(status);
    }
}

// Takes in search terms and
// searches Amazon with a query string
function amazonSearch(searchTerm) {
    // Clean up search term and turn it into an array
    searchTerm = searchTerm.trim()
    searchTerm = encodeURIComponent(searchTerm);
    let termArray = searchTerm.split(" ");

    // Add each search term with + separating them
    let url = "https://www.amazon.com/s?k=";
    termArray.forEach(t => {
        url += t + "+"
    });
    url += "amiibo";

    window.open(url, "_blank");
}

// Helper method to sort amiibo na, eu, ja, etc dates
function sortDates(a, b) {
    if (a && b) {
        if (parseInt(a.substring(0, 5)) > parseInt(b.substring(0, 5)))
            return -1;
        else if (parseInt(a.substring(0, 5)) < parseInt(b.substring(0, 5)))
            return 1;
        else {
            if (parseInt(a.substring(5, 7)) > parseInt(b.substring(5, 7)))
                return -1;
            else if (parseInt(a.substring(5, 7)) < parseInt(b.substring(5, 7)))
                return 1;
            else {
                if (parseInt(a.substring(8, 10)) > parseInt(b.substring(8, 10)))
                    return -1;
                if (parseInt(a.substring(8, 10)) < parseInt(b.substring(8, 10)))
                    return 1;
                else
                    return 0;
            }
        }
    }
}