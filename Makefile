PROOT=$(shell pwd)

build:
	compactor --source $(PROOT)/src/ --destination $(PROOT)/dist/

watch:
	compactor --watch --source $(PROOT)/src/ --destination $(PROOT)/dist/

server:
	statiq --port 5500 --root $(PROOT)/dist/

develop:
	make -j 2 watch server