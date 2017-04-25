env: env/bin/activate

env/bin/activate: requirements.txt
	test -d env || virtualenv env
	env/bin/pip install -Ur requirements.txt
	touch env/bin/activate

install: env
	source env/bin/activate; \
	pip install -e .

run: install
	source env/bin/activate; \
	FLASK_APP=grok flask run --port=8080