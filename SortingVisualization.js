class SortingVisualization extends Visualization {
  constructor(movies) {
      super();
      this.title = "Sorting Algorithms";
      this.movies = movies;
      this.sortedMovies = [...movies];
      this.sorted = false;
      this.runtimeAnalysis = '';
      this.sortingAlgorithm = null;
  }

  draw() {
      textAlign(LEFT);
      textSize(14);
      text(`${this.title} (Revenue)`, 50, 70);

      if (this.sorted) {
          this.drawBars(this.sortedMovies, "revenue", 100, 150, width - 200, height / 2 - 100);
          text(this.runtimeAnalysis, 50, height / 2 - 30);
      } 
      
      else {
          this.drawBars(this.movies, "revenue", 100, 150, width, height / 2 - 100);
          text("Press 'B' for Bubble Sort, 'I' for Built-in Sort", 50, height / 2 - 30);
      }
  }

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

  builtInSort(moviesArray, property) {
      let start = millis();
      moviesArray.sort((a, b) => a[property] - b[property]);
      let time = millis() - start;
      this.runtimeAnalysis = `Built-in Sort Time: ${time.toFixed(2)}ms | Big-O: O(n log n)`;
      return moviesArray;
  }
}
