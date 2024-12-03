class RecursiveVisualization extends Visualization {
  constructor(sortingVis, searchVis) {
      super();
      this.title = "Dynamic Recursive Tree";
      this.sortingVis = sortingVis;
      this.searchVis = searchVis;
      this.depth = 5; 
      this.maxBranchLength = 100; 
  }

  draw() {
      textAlign(LEFT);
      textSize(14);
      text(`${this.title}`, width - 350, 70);

      let sortedMovies = this.sortingVis.sortedMovies;
      let numResults = this.searchVis.results.length;

      this.depth = constrain(numResults, 3, 10);
      this.maxBranchLength = sortedMovies.length > 0 ? this.calculateMaxBranchLength(sortedMovies) : 100;

      push();
      translate(width - 400, height - 200);
      this.drawTree(this.depth, this.maxBranchLength);
      pop();

      text("Tree depth depends on search results.", width - 350, height - 70);
      text("Branch length depends on sorted movie revenues.", width - 350, height - 50);
  }

  drawTree(depth, branchLength) {
      if (depth === 0) return;

      stroke(150);
      line(0, 0, 0, -branchLength);
      translate(0, -branchLength);

      push();
      rotate(PI / 6);
      this.drawTree(depth - 1, branchLength * 0.7); 
      pop();

      push();
      rotate(-PI / 6);
      this.drawTree(depth - 1, branchLength * 0.7); 
      pop();
  }

  calculateMaxBranchLength(sortedMovies) {
      let maxRevenue = Math.max(...sortedMovies.map(movie => parseFloat(movie.revenue) || 0));
      let scaledBranchLength = map(maxRevenue, 0, maxRevenue, 50, 150); 
      return scaledBranchLength;
  }
}
  