/**
 * Class for handling Sorting
 * @extends Visualization
 * @class
 */
class SortingVisualization extends Visualization {
    /**
     * Constructor for the Sorting Class
     * 
     * @constructor
     * @param {String} title - title for the class
     * @param {Array} movies - contains movies info
     * @param {Array} sortedMovies - array of sorted movies
     * @param {boolean} sorted - checks if the array is sorted or not
     * @param {int} runtimeAnalysis - stores the time it takes to run a sorting algorithm
     * @param {String} sortingAlgorithm - stores the type of sort
     */
  constructor(movies) {
      super();
      this._title = "Sorting Algorithms";
      this.movies = movies;
      this.sortedMovies = [...movies];
      this.sorted = false;
      this.runtimeAnalysis = '';
      this.sortingAlgorithm = null;
  }

  /**
   * Method which draws the sorted movies graph
   */
  draw() {
      textAlign(LEFT);
      textSize(14);
      text(`${this._title} (Revenue)`, 50, 70);

      if (this.sorted) {
          this.drawBars(this.sortedMovies, "revenue", 100, 150, width - 200, height / 2 - 100);
          text(this.runtimeAnalysis, 50, height / 2 - 30);
      } 
      
      else {
          this.drawBars(this.movies, "revenue", 100, 150, width, height / 2 - 100);
          text("Press 'B' for Bubble Sort, 'I' for Built-in Sort", 50, height / 2 - 30);
      }
  }

  /**
   * Method to manage the bars which represent the movies
   * 
   * @param {Array} moviesArray - stores the movies in an array
   * @param {String} property - deals with the properties of the movies
   * @param {int} x - stores the x value of the sorted movie
   * @param {int} y - stores the y value of the sorted movie    
   * @param {int} w - stores the width of the bar
   * @param {int} h - stores the height of the bar
   */
  drawBars(moviesArray, property, x, y, w, h) {
      let maxValue = Math.max(...moviesArray.map(movie => movie[property]));
      let barWidth = w / moviesArray.length;

      for (let i = 0; i < moviesArray.length; i++) {
          let movie = moviesArray[i];
          let barHeight = map(movie[property], 0, maxValue, 0, h);

          fill(100, 150, 255);
          rect(x + i * barWidth, y + h - barHeight, barWidth, barHeight);

          fill(255);
          text(movie.title.slice(0, 10), x + i * barWidth + barWidth / 2, y + h - barHeight - 10);
      }
  }

  /**
   * Method to see which key is pressed
   * 
   * @param {String} key - stores which key is pressed
   */
  handleInput(key) {
    if (key === 'B' || key === 'b') {
        this.sortingAlgorithm = 'Bubble Sort';
        this.sortedMovies = this.bubbleSort([...this.movies], 'revenue');
    } 
    
    else if (key === 'I' || key === 'i') {
        this.sortingAlgorithm = 'Built-in Sort';
        this.sortedMovies = this.builtInSort([...this.movies], 'revenue');
    }

    if (this.sortingAlgorithm) {
        this.sorted = true;
        recursiveVis.draw(); 
    }
}

  /**
   * Method for Bubble Sort
   * 
   * @param {Array} moviesArray - stores the movies in an array
   * @param {String} property - deals with the properties of the movies
   * @returns 
   */
  bubbleSort(moviesArray, property) {
      let start = millis();
      for (let i = 0; i < moviesArray.length - 1; i++) {
          for (let j = 0; j < moviesArray.length - i - 1; j++) {
              if (moviesArray[j][property] > moviesArray[j + 1][property]) {
                  [moviesArray[j], moviesArray[j + 1]] = [moviesArray[j + 1], moviesArray[j]];
              }
          }
      }
      let time = millis() - start;
      this.runtimeAnalysis = `Bubble Sort Time: ${time.toFixed(2)}ms | Big-O: O(n²)`;
      return moviesArray;
  }

  /**
   * Method for In-Built Sort
   * 
   * @param {Array} moviesArray - stores the movies in an array
   * @param {String} property - deals with the properties of the movies
   * @returns 
   */
  builtInSort(moviesArray, property) {
      let start = millis();
      moviesArray.sort((a, b) => a[property] - b[property]);
      let time = millis() - start;
      this.runtimeAnalysis = `Built-in Sort Time: ${time.toFixed(2)}ms | Big-O: O(n log n)`;
      return moviesArray;
  }
}
