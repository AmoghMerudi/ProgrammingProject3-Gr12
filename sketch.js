let sortingVis;
let searchVis;
let recursiveVis;
let jsonData = []; // For storing the converted JSON data
let movies; // To store the CSV data

function preload() {
    // Load the CSV file (preloading happens before setup)
    movies = loadTable('/tmdb_5000_movies.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(12);
    fill(255);

    // Convert CSV to JSON after movies is loaded
    let rows = movies.getRows();
    for (let row of rows) {
        let obj = {};
        let columns = movies.columns;
        for (let col of columns) {
            obj[col] = row.get(col); // Map column name to value
        }
        jsonData.push(obj);
    }

    console.log("Loaded Movies:", jsonData);

    // Initialize visualizations
    sortingVis = new SortingVisualization(jsonData);
    searchVis = new SearchVisualization(jsonData);
    recursiveVis = new RecursiveVisualization(sortingVis, searchVis);

    noLoop(); // Only draw once unless animations are required
    searchVis.setTarget("Harry Potter");
}

function draw() {
    background(30);

    // Draw each visualization
    sortingVis.draw();
    searchVis.draw();
    recursiveVis.draw();
}

function keyPressed() {
    sortingVis.handleInput(key);
    searchVis.handleInput(key);
    recursiveVis.handleInput(keyCode);

    redraw(); // Redraw the canvas after input
}
