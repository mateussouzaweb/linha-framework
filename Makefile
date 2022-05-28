PROOT=$(shell pwd)

build:
	compactor \
		--source $(PROOT)/src/ \
		--destination $(PROOT)/dist/

develop:
	compactor \
		--develop true \
		--server :5500 \
		--source $(PROOT)/src/ \
		--destination $(PROOT)/dist/
