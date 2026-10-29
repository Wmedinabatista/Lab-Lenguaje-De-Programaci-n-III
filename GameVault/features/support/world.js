const { setWorldConstructor } = require("@cucumber/cucumber");

class GameVaultWorld {
constructor() {
this.browser = null;
this.page = null;
  
}

}

setWorldConstructor(GameVaultWorld);
