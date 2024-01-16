module.exports = {
  apps : [{
	name   : "udk_test",
	script : "./dist/main.js",
	instances: 2,
	watch: true,
  }]
}
