build:

	# CSS - Sass
	cd html/css/ &&	sass styles.scss:styles.css --style expanded --no-cache

dev:

	# Dev
	cd jquery/src/ && tuild js -dev --no-hint acord.js+modal.js+nav.js+slidetabs.js+tooltip.js+validate.js > ../dist/jquery.linha.plugins.js

	# Min
	cd jquery/dist/ && tuild js -min --no-hint jquery.linha.plugins.js > jquery.linha.plugins.min.js

min:

	# CSS - Sass
	cd html/css/ && sass styles.scss:styles.css --style compressed --no-cache

	# Javascript - Tuild
	cd html/js/ && tuild js -min plugins.js+events.js > plugins.events.min.js

clean: min

	echo "Você tem certeza de que deseja executar esta ação? Tudo será deletado, ficando apenas os arquivos para produção..."
	echo "Para confirmar, digite: SIM"

	read confirm

	if[ "$confirm" != 'SIM'] then exit 0 fi

	# Remove os arquivos
	rm -f README.md
	rm -f -r fireworks/
	rm -f -r photoshop/
	rm -f -r jquery/
	rm -f html/css/*.scss
	rm -f html/js/jquery.js
	rm -f html/js/events.js
	rm -f html/js/plugins.js
	rm -f html/elements.html
	rm -f html/grid.html

	# Movimenta os arquivo
	mv html/example.htaccess html/.htaccess
	mv html/ /

PHONY: build dev min clean