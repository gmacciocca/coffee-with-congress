var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinonChai = require("sinon-chai");

global.sinon = require("sinon");
global.expect = chai.expect;

global.window = { location: { host: "", protocol: "" } };

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.should();
