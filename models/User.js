const uuid = require("uuid/v4");
const db = require("../lib/database");

/**
 * @constructor User - creates an user abstraction for the db

 * @param {object} user - object with the user data
 * @param {string} user.display_name - the user name
 * @param {string} user.email - the user email
 * @param {string} user.href - the user profile
 * @param {string} user.email - defines the user account type
 * @param {object} user.images - an array with the user profile images
 * @param {string} user._id - unique id
 */

class User {
  constructor({ display_name, email, href, product, images, _id = 0 }) {
    this.display_name = display_name;
    this.email = email;
    this.href = href;
    this.product = product;
    this.images = images;
    this._id = _id;
  }

  /**
   * @static
   * @method
   * method for searching an user
   * @param {object} user
   * @param {object} user - object with the user data
   * @param {string} user.display_name - the user name
   * @param {string} user.email - the user email
   * @param {string} user.href - the user profile
   * @param {string} user.email - defines the user account type
   * @param {object} user.images - an array with the user profile images
   * @param {string} user._id - unique id
   *
   * @returns User
   */

  static getUser(user) {
    const result = db
      .get("users")
      .find(user)
      .value();

    if (result) {
      return new User(result);
    } else {
      return null;
    }
  }

  /**
   * @method
   * Method for saving an user
   */
  save() {
    const searchRef = db.get("users");
    if (this._id) {
      return searchRef
        .find({
          display_name: this.display_name
        })
        .assign({ ...this })
        .write();
    } else {
      this._id = uuid();
      return searchRef
        .push({
          display_name: this.display_name,
          email: this.email,
          href: this.href,
          product: this.product,
          images: this.images,
          _id: this._id
        })
        .write();
    }
  }
}

module.exports = User;
