/**
 * Parent Class 
 * @class
 */
class Visualization {
  /**
   * Parent class constructor
   * 
   * @constructor
   * @param {String} title - Project Name
   */
  constructor() {
      this._title = "Visualization";
  }

  /**
   * This method displays the title at a fixed position on the canvas.
   */
  draw() {
      text(this._title, 10, 10);
  }

  /**
   * Handles User input
   * 
   * @param {String} key 
   */
  handleInput(key) {
      // Default input handler
  }
}
