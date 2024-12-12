/**
 * Class for handling Searching
 * @extends Visualization
 * @class
 */
class SearchVisualization extends Visualization {
  /**
     * Constructor for the Sorting Class
     * 
     * @constructor
     * @param {String} title - title for the class
     * @param {Array} movies - contains movies info
     * @param {String} target - stores the search input
     * @param {Array} results - array of search results
     * @param {String} searcingAlgorithm - stores the type of sort
     * @param {int} runtimeAnalysis - stores the time it takes to run a sorting algorithm
     */
  constructor(movies) {
      super();
      this._title = "Search Algorithms";
      this.movies = movies;
      this.target = ""; 
      this.results = [];
      this.searchAlgorithm = null;
      this.runtimeAnalysis = '';
  }

  /**
   * Method which displays the search results
   */
  draw() {
    textAlign(LEFT);
    textSize(14);
    text(`${this._title}`, 50, height - 250);

    if (this.results.length > 0) {
        text(this.runtimeAnalysis, 50, height - 200);

        text(`Search Results (${this.searchAlgorithm}):`, 50, height - 180);
        for (let i = 0; i < this.results.length; i++) {
            let yPosition = height - 160 + i * 20;

            if (yPosition > height - 50) {
                text("... (more results not shown)", 50, yPosition);
                break;
            }
            text(`${this.results[i].title}`, 50, yPosition);
            console.log(this.results[i]);
        }
    } 
    
    else if (this.searchAlgorithm) {
        text(this.runtimeAnalysis, 50, height - 200);
        text(`No results found for "${this.target}"`, 50, height - 180);
    } 
    
    else {
        text("Press 'L' for Linear Search, 'N' for Binary Search", 50, height - 200);
    }
   }

   /**
   * Method to see which key is pressed
   * 
   * @param {String} key - stores which key is pressed
   */
  handleInput(key) {
      if (key === 'L' || key === 'l') {
          this.searchAlgorithm = "Linear Search";
          this.linearSearch();
      } 
      
      else if (key === 'N' || key === 'n') {
          this.searchAlgorithm = "Binary Search";
          this.binarySearch();
      }
  }

  /**
   * Method to perform Linear Search
   */
  linearSearch() {
      let start = millis();
      this.results = this.movies.filter(movie => {
          let title = movie.title ? movie.title.trim().toLowerCase() : ""; 
          return title.includes(this.target.toLowerCase());
      });
      let time = millis() - start;
      this.runtimeAnalysis = `Linear Search Time: ${time.toFixed(2)}ms | Big-O: O(n)`;
  }

  /**
   * Method to perform Binary Search
   */
  binarySearch() {
      let start = millis();
      let sortedMovies = [...this.movies].sort((a, b) => {
          let titleA = a.title ? a.title.trim().toLowerCase() : "";
          let titleB = b.title ? b.title.trim().toLowerCase() : "";
          return titleA.localeCompare(titleB);
      });

      this.results = this.binarySearchHelper(sortedMovies, this.target.toLowerCase());
      let time = millis() - start;
      this.runtimeAnalysis = `Binary Search Time: ${time.toFixed(2)}ms | Big-O: O(log n)`;
  }

  /**
   * 
   * @param {Array} sortedMovies -  stores the sorted movies in an array
   * @param {String} target - stores the search input
   * @returns 
   */
  binarySearchHelper(sortedMovies, target) {
      let low = 0;
      let high = sortedMovies.length - 1;
      let results = [];

      while (low <= high) {
          let mid = Math.floor((low + high) / 2);
          let movieTitle = sortedMovies[mid].title ? sortedMovies[mid].title.trim().toLowerCase() : "";

          if (movieTitle.includes(target)) {
              results.push(sortedMovies[mid]);
              break; 
          } else if (movieTitle < target) {
              low = mid + 1;
          } else {
              high = mid - 1;
          }
      }
      return results;
  }

  /**
   * Method to set the new search input
   * 
   * @param {String} newTarget - stores the new search input
   */
  setTarget(newTarget) {
      this.target = newTarget.trim(); 
      this.results = [];
      this.searchAlgorithm = null;
      this.runtimeAnalysis = '';
  }
}
