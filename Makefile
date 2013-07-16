build:

	# CSS - Sass
	cd scss/ && sass styles.scss:../css/styles.css --style expanded --no-cache

dev:

	# Dev
	cd jquery/src/ && tuild js -dev --no-hint acord.js+modal.js+slidetabs.js+tooltip.js+validate.js > ../dist/jquery.linha.plugins.js

	# Min
	cd jquery/dist/ && tuild js -min --no-hint jquery.linha.plugins.js > jquery.linha.plugins.min.js

min:

	# CSS - Sass
	cd scss/ && sass styles.scss:../css/styles.css --style compressed --no-cache

	# Javascript - Tuild
	cd js/ && tuild js -min plugins.js+events.js > plugins.events.min.js

PHONY: build dev min