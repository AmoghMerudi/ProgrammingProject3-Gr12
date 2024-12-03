class SearchVisualization extends Visualization {
  constructor(movies) {
      super();
      this.title = "Search Algorithms";
      this.movies = movies;
      this.target = ""; 
      this.results = [];
      this.searchAlgorithm = null;
      this.runtimeAnalysis = '';
  }

  draw() {
      textAlign(LEFT);
      textSize(14);
      text(`${this.title}`, 50, height - 250);

      if (this.results.length > 0) {
          text(`Search Results (${this.searchAlgorithm}):`, 50, height - 200);
          for (let i = 0; i < this.results.length; i++) {
              text(`${this.results[i].title}`, 50, height - 180 + i * 20);
          }
          text(this.runtimeAnalysis, 50, height - 50);
      } else if (this.searchAlgorithm) {
          text(`No results found for "${this.target}"`, 50, height - 200);
          text(this.runtimeAnalysis, 50, height - 50);
      } else {
          text("Press 'L' for Linear Search, 'B' for Binary Search", 50, height - 200);
      }
  }

  handleInput(key) {
      if (key === 'L' || key === 'l') {
          this.searchAlgorithm = "Linear Search";
          this.linearSearch();
      } else if (key === 'B' || key === 'b') {
          this.searchAlgorithm = "Binary Search";
          this.binarySearch();
      }
  }

  linearSearch() {
      let start = millis();
      this.results = this.movies.filter(movie => {
          let title = movie.title ? movie.title.trim().toLowerCase() : ""; 
          return title.includes(this.target.toLowerCase());
      });
      let time = millis() - start;
      this.runtimeAnalysis = `Linear Search Time: ${time.toFixed(2)}ms | Big-O: O(n)`;
  }

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

  setTarget(newTarget) {
      this.target = newTarget.trim(); 
      this.results = [];
      this.searchAlgorithm = null;
      this.runtimeAnalysis = '';
  }
}
